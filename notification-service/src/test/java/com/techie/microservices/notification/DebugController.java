package com.techie.microservices.notification;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

@RestController
public class DebugController {

    @GetMapping("/debug/files")
    public Map<String, Object> files() {

        Map<String, Object> map = new HashMap<>();

        String[] paths = {
                "/etc/secrets/ca.pem",
                "/etc/secrets/service.cert",
                "/etc/secrets/service-key-pkcs8.pem"
        };

        for (String path : paths) {
            File file = new File(path);

            Map<String, Object> info = new HashMap<>();
            info.put("exists", file.exists());
            info.put("size", file.exists() ? file.length() : 0);

            map.put(path, info);
        }

        return map;
    }
}