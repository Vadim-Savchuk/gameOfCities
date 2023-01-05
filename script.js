"use strict";

let text      = document.querySelector('.last-city');
const input   = document.querySelector('.city');
const button  = document.querySelector('.button');
let tagTimer  = document.querySelector('.timer');
let nameGamer = document.querySelector('.gamer-name');

let citys    = [];
let gamers   = [1, 0]
let gamerNum = 0;

button.addEventListener('click', game);
input.addEventListener('keypress', function(event){
    if(event.key == 'Enter'){
        game()
    }
});

// Гра
function game(){

    if(input.value.length < 1){
        return;
    }

    for (let i of citys) {
        if (input.value.toUpperCase() == i) {
            alert('Таке місто вже було');
    
            return
        }
    }

    if (citys.length == 0) {
        citys.push(input.value.toUpperCase());
        lastCity(citys);
        input.value = '';
        timer();
        nameGamer.textContent = "Гравець 2";
    } else {

        if (firstLater() == lastLater(citys)) {
            citys.push(input.value.toUpperCase());
            lastCity(citys);
            input.value = '';

            gameGamers();

        } else {
            alert('Місто має закінчуватись на ' + lastLater(citys));
        }
    }
}

// Отсанє місто
function lastCity(arr) {
    let lastWord    = arr[arr.length - 1];
    let newArrLater = lastWord.split('');
    let subSlice    = newArrLater.slice(0, -1).join('');
    let softSign    = '';
    let lastlater;
    
    if(newArrLater[newArrLater.length -1] == 'Ь'){
        subSlice  = newArrLater.slice(0, -2).join('');
        lastlater = newArrLater[newArrLater.length -2];
        softSign  = 'Ь';
    }else{
        lastlater = newArrLater[newArrLater.length -1];
    }

    text.innerHTML = `<h1 class="last-city">${subSlice}<b>${lastlater}</b>${softSign}</h1>`
}

// Перша літера
function firstLater() {
    let str = input.value.toUpperCase();
    let firstLater = str[0];

    return firstLater;
}

// Отсання літера
function lastLater(arr) {
    let lastCity = arr[arr.length - 1];
    let arrLastCity = lastCity.split('');
    let lastLater;

    if(arrLastCity[arrLastCity.length - 1] == 'Ь'){
        lastLater = arrLastCity[arrLastCity.length - 2];
    }else{
        lastLater = arrLastCity[arrLastCity.length - 1];
    }

    return lastLater;
}

// Гравці
function gameGamers(){
    if(gamerNum == 0){
        gamerNum = 1;
        gamers[0]++;

        nameGamer.textContent = "Гравець 1"

    }else if(gamerNum == 1){
        gamerNum = 0;
        gamers[1]++;

        nameGamer.textContent = "Гравець 2"
    }
}

// Переможець
function youWiner(){
    if(gamers[0] > gamers[1]){
        tagTimer.textContent = 'Переміг гравець 1 він набрав - ' + gamers[0] + ' балів';
    }else if(gamers[0] < gamers[1]){
        tagTimer.textContent = 'Переміг гравець 2 він набрав - ' + gamers[1] + ' балів';
    }else if(gamers[0] == gamers[1]){
        tagTimer.textContent = 'Нічія';
    }

    text.textContent = 'Гра перезапуститься автоматично через 5 секунд'
    
    setInterval(function() {
        location.reload();
    }, 5000);
}

// Відлік до кінця гри
function timer(){
    let i = 180;
    let timerId = setInterval(function() {
        tagTimer.textContent = --i
        // console.log(++i);
    
        if (i <= 0) {
            clearInterval(timerId);
            youWiner();
        }
        
    }, 1000);
}