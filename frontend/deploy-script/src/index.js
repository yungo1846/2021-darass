import { hideElement, postParentClickEventToIframe, resizeElementHeight, showElement } from "./common.js";
import { POST_MESSAGE_TYPE } from "./constants.js";
import { createIframe } from "./createIframe.js";
import { getModalURL, getReplyModuleURL } from "./getURL.js";
import { IFRAME_STYLE } from "./style.js";

(function () {
  const $darass = document.querySelector("#darass");
  const $replyModuleIframe = createIframe({ src: getReplyModuleURL(), style: IFRAME_STYLE.REPLY_MODULE });
  const $modalIframe = createIframe({ src: getModalURL(), style: IFRAME_STYLE.MODAL });
  $replyModuleIframe.setAttribute("scrolling", "no");
  $darass.append($replyModuleIframe, $modalIframe);

  window.addEventListener("click", () => postParentClickEventToIframe($replyModuleIframe));
  window.addEventListener("message", ({ data: { type, data } }) => {
    if (!type) return;

    if (type === POST_MESSAGE_TYPE.SCROLL_HEIGHT) {
      resizeElementHeight({ element: $replyModuleIframe, height: data });
      return;
    }

    if (type === POST_MESSAGE_TYPE.OPEN_LIKING_USERS_MODAL) {
      $modalIframe.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.OPEN_LIKING_USERS_MODAL, data }, "*");
      showElement($modalIframe);
      return;
    }

    if (type === POST_MESSAGE_TYPE.CLOSE_MODAL) {
      $replyModuleIframe.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.CLOSE_MODAL }, "*");
      hideElement($modalIframe);
      return;
    }

    if (type === POST_MESSAGE_TYPE.ALERT) {
      alert(data);

      return;
    }

    if (type === POST_MESSAGE_TYPE.OPEN_CONFIRM) {
      $modalIframe.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.OPEN_CONFIRM, data }, "*");
      showElement($modalIframe);
      return;
    }

    if (type === POST_MESSAGE_TYPE.CLOSE_CONFIRM) {
      $replyModuleIframe.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.CLOSE_CONFIRM }, "*");
      hideElement($modalIframe);
      return;
    }

    if (type === POST_MESSAGE_TYPE.CONFIRM_OK) {
      $replyModuleIframe.contentWindow.postMessage({ type: POST_MESSAGE_TYPE.CONFIRM_OK, data }, "*");
      hideElement($modalIframe);
      return;
    }
  });
})();
