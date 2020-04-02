package com.gmail.genadyms.timesheet.controller;

import com.gmail.genadyms.timesheet.exceptions.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("group")
public class GroupController {

    //create fake data
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
        add(new HashMap<String, String>() {{
            put("id", "6");
            put("name", "actors");
        }});
        add(new HashMap<String, String>() {{
            put("id", "7");
            put("name", "coworkers");
        }});
    }};

    private static int counter = groups.size();

    @GetMapping
    public List<Map<String, String>> index() {
        return groups; 
    }

    @GetMapping("{id}")
    public Map<String, String> getGroup(@PathVariable String id) {
        return getGroupById(id);
    }

    private Map<String, String> getGroupById(@PathVariable String id) {
        return groups.stream().
                filter(group -> group.get("id").equals(id)).findFirst().orElseThrow(NotFoundException::new);
    }

    @PostMapping
    public Map<String, String> create(@RequestBody Map<String, String> group) {
        group.put("id", String.valueOf(++counter));
        groups.add(group);
        return group;
    }

    @PutMapping("{id}")
    public Map<String, String> update(@PathVariable String id, @RequestBody Map<String, String> group) {
        Map<String, String> groupById = getGroupById(id);
        groupById.putAll(group);
        groupById.put("id", id);
        return groupById;
    }


    @DeleteMapping("{id}")
    public void delete(@PathVariable String id) {
        Map<String, String> groupById = getGroupById(id);
        groups.remove(groupById);
    }
}
