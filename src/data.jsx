export default [
    {
        "fn": "Limpiar"
    },
    {
        "fn": "((10-x^3)/4)^(1/2)",
        "punto": {
            "g": "((10-x^3)/4)^(1/2)",
            "x0": -0.1,
            "tolerancia": 1e-6,
            "iteraciones": 100
        },
        "nr": {
            "f": "x^2 - 4",
            "x0": 1,
            "tolerancia": 0.001,
            "iteraciones": 10
        },
        "bs": {
            "f": "(4*x^3)-(52*x^2)+(160*x-100)",
            "a": 4.99999999,
            "b": 1,
            "error": 1e-9
        }
    },
    {
        "fn": "sin(2x)",
        "punto": {
            "g": "",
            "tolerance": null,
            "iter": null,
            "x0": null
        },
        "nr": {
            "f": "",
            "x0": null,
            "tolerance": null,
            "iter": null
        },
        "bs": {
            "fn": "sin(x)",
            "a": null,
            "b": null,
            "error": null
        }
    },
    {
        "fn": "sin(x) + 1",
        "punto": {
            "g": "",
            "tolerance": null,
            "iter": null,
            "x0": null
        },
        "nr": {
            "f": "",
            "x0": null,
            "tolerance": null,
            "iter": null
        },
        "bs": {
            "fn": "sin(x)",
            "a": null,
            "b": null,
            "error": null
        }
    },
    {
        "fn": "x^3 - 2x + 1",
        "punto": {
            "g": "",
            "tolerance": null,
            "iter": null,
            "x0": null
        },
        "nr": {
            "f": "x^3 - 2x + 1",
            "x0": 1,
            "tolerance": 0.0001,
            "iter": 10
        },
        "bs": {
            "fn": "x^3 - 2x + 1",
            "a": -2,
            "b": 2,
            "error": 0.000001
        }
    },
    {
        "fn": "e^x - 3",
        "punto": {
            "g": "",
            "tolerance": null,
            "iter": null,
            "x0": null
        },
        "nr": {
            "f": "e^x - 3",
            "x0": 1,
            "tolerance": 0.0001,
            "iter": 10
        },
        "bs": {
            "fn": "e^x - 3",
            "a": 0,
            "b": 2,
            "error": 0.000001
        }
    }
]

