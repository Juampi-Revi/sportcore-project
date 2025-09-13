package com.sportcore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SportCoreApplication {

    public static void main(String[] args) {
        SpringApplication.run(SportCoreApplication.class, args);
    }
}
