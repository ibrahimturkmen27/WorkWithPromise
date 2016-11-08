/**
 * Created by trkmn27 on 07.11.2016.
 */

"use strict";

function promiseGenerator(id) {
    return new Promise((resolve, reject) => {
        var randomNumber = Math.floor(Math.random() * 5);
        setTimeout(() => {
            if (randomNumber >= 2) {
                resolve({id: id, data: randomNumber});
            } else {
                reject({id: id, data: randomNumber});
            }
            
        }, randomNumber / 2 * 1000);
    });
}

const _Promise = {

    all : function (promises) {
        return new Promise((resolve, reject) => {
            let succeed = [];
            let successCounter = 0;
            promises.forEach(function (promise, index) {
                promise
                    .then(function (data) {
                        succeed[index] = data;
                        successCounter++;
                        if (successCounter === promises.length) {
                            resolve(succeed);
                        }
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        });
    },

    race : function (promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(function (promise) {
                promise
                    .then(function (data) {
                        resolve(data);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        });
    }
};

var promises = [1, 2, 3].map(promiseGenerator);
var promises2 = [6, 7, 8].map(promiseGenerator);





Promise.race(promises2)
    .then(succesfulResult => {
        console.log("Promise.race succeed result", succesfulResult);
    })
    .catch(errorResult => {
        console.log("Promise.race failed result", errorResult);
    });
_Promise.race(promises2)
    .then(successfulResult => {
        console.log("My_Promise.race succeed result ", successfulResult);
    })
    .catch (errorResult => {
        console.log("My_Promise.race failed result ", errorResult);
    });

Promise.all(promises)
    .then(succesfulResult => {
        console.log("Promise.all succeed result", succesfulResult);
    })
    .catch(errorResult => {
        console.log("Promise.all failed result", errorResult);
    });

_Promise.all(promises)
    .then(succesfulResult => {
        console.log("My_Promise.all succeed result", succesfulResult);
    })
    .catch(errorResult => {
        console.log("My_Promise.all failed result", errorResult);
    });

