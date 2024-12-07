import math


def quadratic_formula(a, b, c):
    s = b ** 2 - 4 * a * c
    if s >= 0:
        left = (-b - math.sqrt(s)) / (2 * a)
        right = (-b + math.sqrt(s)) / (2 * a)
        return left, right


def calc_t(v, pos):
    """Calculate t for x(t) = pos
        x(t) = (-1/2)t^2 + (1/2 + vx)t
        x(t) = pos => x(t) - pos = 0
    """
    a = -1 / 2
    b = 1 / 2 + v
    c = -pos

    res = quadratic_formula(a, b, c)
    if res is not None:
        l, r = res
        return min(filter(lambda t: t >= 0, (l, r)))


def t_range_x(vx, area):
    """Calculate range [t1, t2] for pos_x(t1, v) >= area_x[0] and pos_x(t2, v) <= area_x[1]
        Even though the function for x and y can be the same, x has drag, so it's not
        guaranteed t2 exists, and if so, t2 = inf
    """
    low = calc_t(vx, area[0])
    if low is None:
        return math.inf, -math.inf

    high = calc_t(vx, area[1])

    left = math.ceil(low)
    # if low t reached area[0], and high t doesn't reach area[1],
    # this means it stopped inside area
    right = math.inf if high is None else math.floor(high)
    return left, right


def t_range_y(vy, area):
    low = calc_t(vy, area[1])
    high = calc_t(vy, area[0])

    left = math.ceil(low)
    right = math.floor(high)
    return left, right


def range_intersection(a, b):
    return (a[0] <= b[1] and a[1] >= b[0]) or (b[0] <= a[1] and b[1] >= a[0])


def distinct_velocities(area):
    ys = dict()
    for y in range(area[1][0], 150):
        t = t_range_y(y, area[1])
        if t[0] <= t[1]:
            ys[y] = t

    xs = dict()
    for x in range(area[0][1] + 1):
        t = t_range_x(x, area[0])
        if t[0] <= t[1]:
            xs[x] = t
    velocities = []
    for y, y_iter_range in ys.items():
        for x, x_iter_range in xs.items():
            if range_intersection(y_iter_range, x_iter_range):
                velocities.append((x, y))
    return velocities


"""
Day 17 notes
x[t] = x[t - 1] + vx - (t - 1), for t > 0
x0 = 0
x1 = x0 + vx + (-1 * 0)
x2 = x1 + vx + (-1 * 1) => x2 = 0 + vx - 0 + vx - 1
x3 = x2 + vx + (-1 * 2) => x3 = 0 + vx - 0 + vx - 1 + vx - 2
x[t] = vx * t - sum(t - 1), t >= 0 U t <= 1/2 + vx, x[tmax +1..] = x[tmax] (it doesn't change anymore due to drag)
sum(t - 1) = t * (t- 1) / 2
           = (1/2) t ** 2 + (-1/2) t
x(t) = vx t - ((1/2) t ** 2 + (-1/2) t)
x(t) = (-1/2)t^2 + (1/2 + vx)t
y[t] = vy * t - sum(t - 1), t >= 0
It's the same as x, except no drag
x(t) = (-1/2)t^2 + (1/2 + vx)t
x'(t) = -t + 1/2 + vx
x'(t) = 0
t = 1/2 + vx
"""
