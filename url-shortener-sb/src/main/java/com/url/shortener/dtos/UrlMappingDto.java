package com.url.shortener.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UrlMappingDto {
    private String originalUrl;
    private String shortUrl;
    private Long id;
    private int clickCount;
    private LocalDateTime createDate;
    private String username;
}
