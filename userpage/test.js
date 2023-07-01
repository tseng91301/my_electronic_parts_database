let b;
(async () => {
    // ############### TEST 1 START ###############
    console.log("Without sleep")
    for (b = 0; b < 5; b++) {
        f().then((res) => {
            console.log(then: b = ${b})
        })
    }
    // ############### TEST 1 END ###############



    // ############### SLEEP TO SEPARATE TESTS ###############
    // sleep for 1000ms (1s)
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    console.log("\n\n\n")
    // ############### SLEEP ############### 



    // ############### TEST 2 START ###############
    console.log("With sleep")
    for (b = 0; b < 5; b++) {
        f().then((res) => {
            console.log("then: b = ${b}")
        })

        // sleep for 100ms (0.5s)
        await new Promise((resolve, reject) => setTimeout(resolve, 500));
    }
    // ############### TEST 2 END ###############
})();




function f() {
    return new Promise((resolve, reject) => {
        console.warn(f(): b = ${b})
        resolve();
    })
}