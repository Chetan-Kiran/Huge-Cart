package com.techie.microservices.notification;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

@RestController
public class DebugController {

    @GetMapping("/debug/files")
    public Map<String, Object> files() throws Exception {

        Map<String, Object> map = new HashMap<>();

        String[] paths = {
                "/etc/secrets/ca.pem",
                "/etc/secrets/service.cert",
                "/etc/secrets/service-key-pkcs8.pem"
        };

        for (String path : paths) {
            Path p = Path.of(path);

            Map<String, Object> info = new HashMap<>();
            info.put("exists", Files.exists(p));
            info.put("size", Files.exists(p) ? Files.size(p) : 0);

            if (Files.exists(p)) {
                String firstLine = Files.readAllLines(p).get(0);
                info.put("firstLine", firstLine);
            }

            map.put(path, info);
        }

        return map;
    }

    @GetMapping("/debug/key")
    public String key() throws Exception {
        var path = Path.of("/etc/secrets/service-key-pkcs8.pem");
        var key = Files.readString(path);

        return key.substring(0, 35);
    }
}