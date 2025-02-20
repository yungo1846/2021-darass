package com.darass.darass.auth.oauth.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestBody;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.darass.darass.AcceptanceTest;
import com.darass.darass.auth.oauth.api.domain.OAuthProvider;
import com.darass.darass.auth.oauth.api.domain.OAuthProviderType;
import com.darass.darass.auth.oauth.dto.TokenRequest;
import com.darass.darass.auth.oauth.dto.TokenResponse;
import com.darass.darass.auth.oauth.infrastructure.JwtTokenProvider;
import com.darass.darass.exception.ExceptionWithMessageAndCode;
import com.darass.darass.exception.dto.ExceptionResponse;
import com.darass.darass.user.domain.SocialLoginUser;
import com.darass.darass.user.repository.SocialLoginUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

@DisplayName("Auth 인수 테스트")
public class AuthAcceptanceTest extends AcceptanceTest {

    private final String apiUrl = "/api/v1/login/oauth";

    @Autowired
    private SocialLoginUserRepository socialLoginUserRepository;

    @SpyBean(name = "jwtTokenProvider")
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private OAuthProvider oauthProvider;

    private String oauthAccessToken;

    private SocialLoginUser socialLoginUser;

    private String refreshToken;

    private String oauthProviderName = OAuthProviderType.KAKAO.getName();

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);

        oauthAccessToken = "LiCNQrImAFxi3LJAdt9ipGMSeOhmR4hw33Ao9cx6jkvW5w";
        socialLoginUser = SocialLoginUser
            .builder()
            .nickName("우기")
            .oauthId("6752453")
            .oauthProviderType(OAuthProviderType.KAKAO)
            .email("jujubebat@kakao.com")
            .build();
        socialLoginUser.createRefreshToken(jwtTokenProvider);
        refreshToken = socialLoginUser.getRefreshToken();
        socialLoginUserRepository.save(socialLoginUser);
    }

    @Test
    @DisplayName("oauth2 토큰을 통해 회원가입 또는 로그인을 진행하고 JWT 토큰을 발급 받는다.")
    public void login_success() throws Exception {
        // given
        given(oauthProvider.findSocialLoginUser(OAuthProviderType.KAKAO.getName(), oauthAccessToken))
            .willReturn(socialLoginUser);

        //when
        ResultActions resultActions = 토큰_발급_요청(oauthAccessToken);

        //then
        토큰_발급됨(resultActions);
    }

    @Test
    @DisplayName("올바르지 않은 oauth2 토큰을 보낼 경우 로그인을 실패하고 JWT 토큰을 발급 받지 못한다.")
    public void login_fail() throws Exception {
        // given
        given(oauthProvider.findSocialLoginUser(OAuthProviderType.KAKAO.getName(), oauthAccessToken))
            .willThrow(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.getException());

        // when
        ResultActions resultActions = 토큰_발급_요청(oauthAccessToken);

        //then
        토큰_발급_실패됨(resultActions);
    }

    @Test
    @DisplayName("login 메서드는 로그인 또는 회원가입이 성공했을 경우, refreshToken이 Response의 Cookie로 전달된다.")
    public void login_refreshToken() throws Exception {
        // given
        given(oauthProvider.findSocialLoginUser(OAuthProviderType.KAKAO.getName(), oauthAccessToken))
            .willReturn(socialLoginUser);

        // when
        Cookie refreshTokenCookie = 토큰_발급_요청(oauthAccessToken).andReturn().getResponse().getCookie("refreshToken");

        // when, then
        assertThat(refreshTokenCookie).isNotNull();
    }

    private ResultActions 토큰_발급_요청(String oauthAccessToken) throws Exception {
        return this.mockMvc.perform(post(apiUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(new ObjectMapper().writeValueAsString(new TokenRequest(oauthProviderName, oauthAccessToken))));
    }

    private void 토큰_발급됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        TokenResponse tokenResponse = new ObjectMapper().readValue(jsonResponse, TokenResponse.class);
        String accessToken = tokenResponse.getAccessToken();

        assertThat(jwtTokenProvider.getPayloadOfAccessToken(accessToken)).isEqualTo(socialLoginUser.getId().toString());

        토큰_인증_로그인_rest_doc_작성(resultActions);
    }

    private void 토큰_인증_로그인_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/auth-login/post/success",
                requestFields(
                    fieldWithPath("oauthProviderName").description("소셜 로그인을 플랫폼 이름"),
                    fieldWithPath("oauthAccessToken").description("소셜 로그인을 통한 발급받은 엑세스 토큰")
                ),
                responseFields(
                    fieldWithPath("accessToken").type(JsonFieldType.STRING).description("서버헤서 발급해준 엑세스 토큰")
                ))
        );
    }

    private void 토큰_발급_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isUnauthorized());

        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ExceptionResponse exceptionResponse = new ObjectMapper().readValue(jsonResponse, ExceptionResponse.class);

        assertThat(exceptionResponse.getMessage()).isEqualTo(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.findMessage());
        assertThat(exceptionResponse.getCode()).isEqualTo(ExceptionWithMessageAndCode.INVALID_JWT_TOKEN.findCode());

        토큰_인증_로그인_실패_rest_doc_작성(resultActions);
    }

    private void 토큰_인증_로그인_실패_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/auth-login/post/fail",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                ))
        );
    }

    @Test
    @DisplayName("refreshToken 메서드는 쿠키에 담겨있는 Refresh Token을 통해 Access Token을 재발급 받는다.")
    public void refresh_success() throws Exception {
        // given
        given(oauthProvider.findSocialLoginUser(OAuthProviderType.KAKAO.getName(), oauthAccessToken))
            .willReturn(socialLoginUser);

        //when
        Cookie cookie = new Cookie("refreshToken", refreshToken);
        ResultActions resultActions = 토큰_재발급_요청(cookie);

        //then
        토큰_재발급됨(resultActions);
    }

    @Test
    @DisplayName("refreshToken 메서드는 쿠키에 정상적으로 RefreshToken이 안 들어있거나, RefrehToken이 만료되거나 유효하지 않다면 Access Token을 발급해주지 않는다.")
    public void refresh_fail() throws Exception {
        // given
        given(oauthProvider.findSocialLoginUser(OAuthProviderType.KAKAO.getName(), oauthAccessToken))
            .willReturn(socialLoginUser);

        //when
        Cookie cookie = new Cookie("invalid", "invalid");
        ResultActions resultActions = 토큰_재발급_요청(cookie);

        //then
        토큰_재발급_실패됨(resultActions);
    }

    private ResultActions 토큰_재발급_요청(Cookie cookie) throws Exception {
        return this.mockMvc.perform(post("/api/v1/login/refresh")
            .cookie(cookie)
            .contentType(MediaType.APPLICATION_JSON));
    }

    private void 토큰_재발급됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isOk());
        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        TokenResponse tokenResponse = new ObjectMapper().readValue(jsonResponse, TokenResponse.class);
        String accessToken = tokenResponse.getAccessToken();

        assertThat(jwtTokenProvider.getPayloadOfAccessToken(accessToken)).isEqualTo(socialLoginUser.getId().toString());

        토큰_재발급_rest_doc_작성(resultActions);
    }

    private void 토큰_재발급_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/login-refresh/post/success",
                responseFields(
                    fieldWithPath("accessToken").type(JsonFieldType.STRING).description("서버헤서 발급해준 엑세스 토큰")
                ))
        );
    }

    private void 토큰_재발급_실패됨(ResultActions resultActions) throws Exception {
        resultActions.andExpect(status().isUnauthorized());

        String jsonResponse = resultActions.andReturn().getResponse().getContentAsString();
        ExceptionResponse exceptionResponse = new ObjectMapper().readValue(jsonResponse, ExceptionResponse.class);

        assertThat(exceptionResponse.getMessage()).isEqualTo(ExceptionWithMessageAndCode.SHOULD_LOGIN.findMessage());
        assertThat(exceptionResponse.getCode()).isEqualTo(ExceptionWithMessageAndCode.SHOULD_LOGIN.findCode());

        토큰_재발급_실패_rest_doc_작성(resultActions);
    }

    private void 토큰_재발급_실패_rest_doc_작성(ResultActions resultActions) throws Exception {
        resultActions.andDo(
            document("api/v1/login-refresh/post/fail",
                responseFields(
                    fieldWithPath("message").type(JsonFieldType.STRING).description("에러 메시지"),
                    fieldWithPath("code").type(JsonFieldType.NUMBER).description("에러 코드")
                ))
        );
    }
}
