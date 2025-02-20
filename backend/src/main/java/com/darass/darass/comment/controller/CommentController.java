package com.darass.darass.comment.controller;

import com.darass.darass.auth.oauth.domain.AuthenticationPrincipal;
import com.darass.darass.auth.oauth.domain.RequiredLogin;
import com.darass.darass.comment.dto.CommentCreateRequest;
import com.darass.darass.comment.dto.CommentDeleteRequest;
import com.darass.darass.comment.dto.CommentReadRequest;
import com.darass.darass.comment.dto.CommentReadRequestByPagination;
import com.darass.darass.comment.dto.CommentReadRequestBySearch;
import com.darass.darass.comment.dto.CommentReadRequestInProject;
import com.darass.darass.comment.dto.CommentResponse;
import com.darass.darass.comment.dto.CommentResponses;
import com.darass.darass.comment.dto.CommentStatRequest;
import com.darass.darass.comment.dto.CommentStatResponse;
import com.darass.darass.comment.dto.CommentUpdateRequest;
import com.darass.darass.comment.service.CommentService;
import com.darass.darass.user.domain.User;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/v1")
@RestController
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/comments")
    public ResponseEntity<CommentResponses> read(@ModelAttribute CommentReadRequest commentReadRequest) {
        CommentResponses commentResponses = commentService.findAllCommentsByUrlAndProjectKey(commentReadRequest);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponses);
    }

    @GetMapping("/comments/paging")
    public ResponseEntity<CommentResponses> readByPageRequest(
        @ModelAttribute CommentReadRequestByPagination commentReadRequestByPagination) {
        CommentResponses commentResponses = commentService
            .findAllCommentsByUrlAndProjectKeyUsingPagination(commentReadRequestByPagination);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponses);
    }

    @GetMapping("/projects/comments/search/paging")
    public ResponseEntity<CommentResponses> readByPageRequestUsingSearch(
        @ModelAttribute CommentReadRequestBySearch CommentReadRequestBySearch) {
        CommentResponses commentResponses = commentService
            .findAllCommentsInProjectUsingSearch(CommentReadRequestBySearch);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponses);
    }

    @GetMapping("/projects/comments/paging")
    public ResponseEntity<CommentResponses> readByPageRequestInProject(
        @ModelAttribute CommentReadRequestInProject commentReadRequestInProject) {
        CommentResponses commentResponses = commentService
            .findAllCommentsInProject(commentReadRequestInProject);
        return ResponseEntity.status(HttpStatus.OK).body(commentResponses);
    }

    @GetMapping("/comments/stat")
    public ResponseEntity<CommentStatResponse> giveStat(@ModelAttribute CommentStatRequest commentStatRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(commentService.giveStat(commentStatRequest));
    }

    @PostMapping("/comments")
    public ResponseEntity<CommentResponse> save(@AuthenticationPrincipal User user,
        @Valid @RequestBody CommentCreateRequest commentRequest) {
        CommentResponse commentResponse = commentService.save(user, commentRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(commentResponse);
    }

    @PatchMapping("/comments/{id}")
    public ResponseEntity<Void> update(@PathVariable("id") Long id, @AuthenticationPrincipal User user,
        @RequestBody CommentUpdateRequest request) {
        commentService.updateContent(id, user, request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id, @AuthenticationPrincipal User user,
        @ModelAttribute CommentDeleteRequest request) {
        commentService.delete(id, user, request);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/comments/{id}/like")
    public ResponseEntity<Void> clickLikeButton(@PathVariable("id") Long id, @RequiredLogin User user) {
        commentService.toggleLikeStatus(id, user);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}