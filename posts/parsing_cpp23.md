# Parsing and functional code with modern C++

## Context

  During AoC, comparing with other languages

  ```rs
    let lines: Vec<&str> = input.split('\n').collect();
    let time_line = lines.first().unwrap();
    let distance_line = lines.get(1).unwrap();
    time_line
        .split_whitespace()
        .skip(1)
        .zip(distance_line.split_whitespace().skip(1))
        .map(|(time, distance)| Race {
            time: time.parse::<u128>().unwrap(),
            distance: distance.parse::<u128>().unwrap(),
        })
        .collect()
```

## Problems

  Online example are ugly to read

  ```cpp
struct line { 
    std::string text1, text2, text3, text4, text5;

    friend std::istream &operator>>(std::istream &is, line &l) {
        std::getline(is, l.text1, ':');
        std::getline(is, l.text2, '\t');
        std::getline(is, l.text3, ':');
        std::getline(is, l.text4, ' ');
        std::getline(is, l.text5);
        return is;
    }
};
```

## Solutions

  Using views

### Aliases

rv vs std::ranges::view

### StringView problem

split_sv

### Conversion helpers

to_int / to_ints

### Getters

rv::get0

### Final

```cpp
 auto times = lines | rv::get0 | rv::split_string_view(':') | rv::get1 | rv::split_string_view(' ') |
                     rv::filter_empty | rv::to_ints;

        auto distances = lines | rv::get1 | rv::split_string_view(':') | rv::get1 | rv::split_string_view(' ') |
                         rv::filter_empty | rv::to_ints;

        auto compute = [](auto time, auto distance) {
            auto b = -time;
            auto c = distance;

            int speed = (-b - std::sqrt(b * b - 4 * c)) / 2;
            int speed2 = (-b + std::sqrt(b * b - 4 * c)) / 2;

            if (speed2 * (time - speed2) == distance) {
                speed2 -= 1;
            }

            return speed2 - speed;
        };

        auto view = rv::zip_transform(compute, times, distances);

        auto result = rs::fold_left(view, 1, std::multiplies<int>());
```


