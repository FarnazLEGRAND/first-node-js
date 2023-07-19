function synchrone() {
    let result=0;
    for(let i = 0; i < 100000000000; i++){
        result += i*i*i*i*i;
    }
    return result;
}

function asyncWithCallback(callback) {
    let result=0;
    for(let i = 0; i < 100000000000; i++){
        result += i*i*i*i*i;
    }
    callback(result);
}

function asyncWithPromise() {
    return new Promise((resolve) => {
        let result=0;
        for(let i = 0; i < 100000000000; i++){
            result += i*i*i*i*i;
        }
        resolve(result);
    } );
}

const result = synchrone();
console.log(result);

asyncWithCallback((result) => console.log(result));

asyncWithPromise().then(result => console.log(result));

async function doStuff() {
    const result = await asyncWithPromise();
    console.log(result);
}