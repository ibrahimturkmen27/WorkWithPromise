/**
 * Created by trkmn27 on 08.11.2016.
 */

const _Promise = require("./../app/promise");

describe("_Promise", () => {
    describe("all", () => {
        it("should return reject that first element rejected the others resolved ", () => {

            let promises = [
                Promise.reject(),
                Promise.resolve(1),
                Promise.resolve(2)
            ];

            _Promise.all(promises).catch(result => expect(result).toEqual(promises[0]));
        });
        
        it("should return reject that the second element rejected the others resolved", () => {

            let promises = [
               Promise.resolve(1),
               Promise.reject(),
               Promise.resolve(2)
           ];

            _Promise.all(promises).catch(result => expect(result).toEqual(promises[1]));
        });

        it("should return reject that the last element rejected the others resolved", () => {

            let promises = [
               Promise.resolve(1),
               Promise.resolve(2),
               Promise.reject()
           ];

            _Promise.all(promises).catch(result => expect(result).toEqual(promises[2]));
        });

        it("should return resolve that the all elements resolved ", () => {

            let promises = [
               Promise.resolve(1),
               Promise.resolve(2),
               Promise.resolve(3)
           ];

            _Promise.all(promises).then(result => expect(result).toEqual(promises));
        });

        it("should return true that the all elements which finishing unequal time resolved and " +
            "they aligned sequence as same as giving promises array ", () => {

            let promises = [
                setTimeout(function() {
                    Promise.resolve(1);
                }, 3000),
                setTimeout(function() {
                    Promise.resolve(2);
                }, 1000),
                setTimeout(function() {
                    Promise.resolve(3);
                }, 2000)
            ];

            _Promise.all(promises).then(result => expect(result).toEqual(promises));
        });
    });

    describe("race", () => {
        it("should return first rejected element that the first element rejected the others resolve", () => {

            let promises = [
                Promise.reject(),
                Promise.resolve(1),
                Promise.resolve(2)
            ];

            _Promise.race(promises).catch(result => expect(result).toEqual(promises[0]));
        });

        it("should return second rejected element that " +
            "the second element rejected the others resolved", () => {

            let promises = [
                Promise.resolve(1),
                Promise.reject(),
                Promise.resolve(2)
            ];

            _Promise.race(promises).catch(result => expect(result).toEqual(promises[1]));
        });

        it("should return last rejected element that the last element rejected the others resolved", () => {

            let promises = [
                Promise.resolve(1),
                Promise.resolve(2),
                Promise.reject()
            ];

            _Promise.race(promises).catch(result => expect(result).toEqual(promises[2]));
        });

        it("should return first resolved element that the all elements which finishing unequal time resolved and " +
            "first is the earliest resolved" , () => {

            let promises = [
                setTimeout(function() {
                    Promise.resolve(1);
                }, 1000),
                setTimeout(function() {
                    Promise.resolve(2);
                }, 3000),
                setTimeout(function() {
                    Promise.resolve(3);
                }, 2000)
            ];

            _Promise.race(promises).then(result => expect(result).toEqual(promises[0]));
        });

        it("should return second resolved element that the all elements which finishing unequal time resolved and " +
            "second is the earliest resolved" , () => {

            let promises = [
                setTimeout(function() {
                    Promise.resolve(1);
                }, 2000),
                setTimeout(function() {
                    Promise.resolve(2);
                }, 1000),
                setTimeout(function() {
                    Promise.resolve(3);
                }, 3000)
            ];

            _Promise.race(promises).then(result => expect(result).toEqual(promises[1]));
        });
        it("should return last resolved element that the all elements which finishing unequal time resolved and " +
            "last is the earliest resolved" , () => {

            let promises = [
                setTimeout(function() {
                    Promise.resolve(1);
                }, 3000),
                setTimeout(function() {
                    Promise.resolve(2);
                }, 2000),
                setTimeout(function() {
                    Promise.resolve(3);
                }, 1000)
            ];

            _Promise.race(promises).then(result => expect(result).toEqual(promises[2]));
        });

        it("should return second resolved element that the second and " +
            "last elements which finishing equal time resolved and " +
            "they are earlier than first element ", () => {

            let promises = [
                setTimeout(function() {
                    Promise.resolve(1);
                }, 2000),
                setTimeout(function() {
                    Promise.resolve(2);
                }, 1000),
                setTimeout(function() {
                    Promise.resolve(3);
                }, 1000)
            ];

            _Promise.race(promises).then(result => expect(result).toEqual(promises[1]));
        });
    });
});

