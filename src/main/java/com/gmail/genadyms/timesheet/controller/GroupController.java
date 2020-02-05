package com.gmail.genadyms.timesheet.controller;

import com.gmail.genadyms.timesheet.exceptions.NotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("group")
public class GroupController {
    private static List<Map<String, String>> groups = new ArrayList<Map<String, String>>() {{
        add(new HashMap<String, String>() {{
            put("id", "1");
            put("name", "work");
        }});
        add(new HashMap<String, String>() {{
            put("id", "2");
            put("name", "study");
        }});
        add(new HashMap<String, String>() {{
            put("id", "3");
            put("name", "sport");
        }});
        add(new HashMap<String, String>() {{
            put("id", "4");
            put("name", "family");
        }});
        add(new HashMap<String, String>() {{
            put("id", "5");
            put("name", "friend");
        }});
    }};

    @GetMapping
    public List<Map<String, String>> index() {
        return groups;
    }

    @GetMapping("{id}")
    public Map<String, String> getGroup(@PathVariable String id) {
        return groups.stream().
                filter(group -> group.get("id").equals(id)).findFirst().orElseThrow(NotFoundException::new);
    }
}
