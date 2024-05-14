export default [{
    fn: "Limpiar",
}, {
    fn: "((10-x^3)/4)^(1/2)",
    punto: {
        g: '((10-x^3)/4)^(1/2)',
        tolerancia: 1e-6,
        iter: 100,
        x0: -0.1
    },
    nr: {
        f: 'x^2 - 4',
        x0: 1,
        tolerance:  0.001,
        iter: 10
    },
    bs: {
        fn: "4*x^3-52*x^2+160*x-100",
        a: 4.99999999,
        b: 1,
        error: 10 ^ -9
    },
}, {
    fn: "sin(2x)",
    punto: {
        g: '',
        tolerance: 0,
        iter: 0,
        x0: 1
    },
    nr: {
        f: '',
        x0: 1,
        tolerance: 0,
        iter: 0,
    },
    bs: {
        fn: "sin(x)",
        a: 1,
        b: null,
        error: 0,
    },
}, {
    fn: "sin(x) + 1",
    punto: {
        g: '',
        tolerance: 0,
        iter: 0,
        x0: 1
    },
    nr: {
        f: '',
        x0: 1,
        tolerance: 0,
        iter: 0,
    },
    bs: {
        fn: "sin(x)",
        a: 1,
        b: null,
        error: 0,
    },
}]
