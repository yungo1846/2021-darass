package com.darass.darass.comment.repository;

import com.darass.darass.comment.domain.CommentStat;
import java.time.LocalDateTime;
import java.util.List;

public interface CommentCountStrategy {

    boolean isCountable(String period);

    List<CommentStat> calculateCount(String projectKey, LocalDateTime startDate, LocalDateTime endDate);
}
