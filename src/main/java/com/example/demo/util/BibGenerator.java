package com.example.demo.util;

import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicInteger;

@Component
public class BibGenerator {

    private final AtomicInteger counter = new AtomicInteger(1000);

    public int generateBib() {
        return counter.incrementAndGet();
    }
}