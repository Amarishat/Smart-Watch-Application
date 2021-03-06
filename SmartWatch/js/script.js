/*

Technology Used:HTML,css,javaScript,Bootstrap,jQuery
Objective: Create a smartwatch which able to show time, check message, play music and has a stopwatch
*/
/*music player content start*/
const songs = [{
        song: "media/Darshana-MassTamilan.fm.mp3",
        name: "Darsana",
        singer: "Hesham",
        poster: "media/poster7.jpg"
    },
    {
        song: "media/Hridayam-Theme-MassTamilan.fm1.mp3",
        name: "Hridayam Theme",
        singer: "Hesham",
        poster: "media/poster8.jpg"
    },
    {
        song: "Manasse-Manasse-MassTamilan.fm.mp3",
        name: "Manasse",
        singer: "Vineeth Srinivasan",
        poster: "media/poster9.jpg"
    },
    {
        song: "Mukilinte-MassTamilan.fm.mp3",
        name: "Mukilinte",
        singer: "KS Chitra",
        poster: "media/poster10.jpg"
    },
    {
        song: "media/Nagumo-MassTamilan.fm.mp3",
        name: "Nagumo",
        singer: "Hesham",
        poster: "media/poster11.jpg"
    },
    {
        song: "media/Sarvam-Sadha-MassTamilan.fm.mp3",
        name: "Sarvam Sadha",
        singer: "Hesham",
        poster: "media/poster12.jpg"
    }
];
const message = [{
        id: 1,
        sender: "Virat Kohli",
        msg: " Hello",
        color: "#ff6666"
    },
    {
        id: 2,
        sender: "Ab Devillers",
        msg: "Hello",
        color: "#99ff99"
    },
    {
        id: 3,
        sender: "KL Rahul",
        msg: "Hello",
        color: "#ff80df"
    },
    {
        id: 4,
        sender: "Siraj",
        msg: "Hello",
        color: "#99ff99"
    },
    {
        id: 5,
        sender: "Chahal",
        msg: "Hello",
        color: "#ff80df"
    }
];
const lapData = new Array();
let songName = document.getElementById("songName");
let singerName = document.getElementById("singerName");
let fillBar = document.getElementById("fill");
let mins = document.getElementById("min");
let secs = document.getElementById("sec");
let cents = document.getElementById("cent");
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let reset = document.getElementById("reset");
let lap = document.getElementById("lap"),
    currentTimer = 0,
    interval = 0,
    count = 0,
    countLap = 1,
    hr, sc, mc = 0,
    mn, msg1, msg2,
    timeHour, weekDay, jt, jap, minCount = 0,
    initSec = 0;
initMin = 0, initCents = 0, lpCount = 1,
    ele = document.querySelector('.msg-content');
ele.innerHTML = ele.innerHTML.replace(/,/g, ',<br/>');
let date = new Date();
let song = new Audio();
let lastUpdateTime = new Date().getTime();
let currentSong = 2,
    tm;

function msgBox(v) {
    let msgFilter = message.filter((item) => item.id === v).map((v, k) => v).forEach((v, k) => {
        document.getElementById("msgMainDiv").style.display = 'none';
        document.getElementById("msgRead").style.display = 'block';
        document.getElementById("msgName").innerHTML = v.sender;
        document.getElementById("msgIcon").style.backgroundColor = v.color;
        document.getElementById("msgIcon").innerHTML = v.sender.charAt(0);
        document.getElementById("msgContent").innerHTML = v.msg;
    });
}

function getDayTime() {
    let h = date.getHours();
    let min = date.getMinutes();
    let day = date.getDay();
    let ampm, h1, time, p, morning, noon, evening, night;
    const days = new Array('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THRUSDAY', 'FRIDAY', 'SATURDAY');
    (h >= 12) ? ampm = 'PM': ampm = 'AM';
    (min < 10) ? min = "0" + min: min = min;
    h = h % 12;
    h1 = h;
    if (h == 0) {
        h1 = 12;
        p = 0;
    } else if (h < 10) {
        h1 = h;
        p = h;
    }
    (h1 < 10) ? h1 = "0" + h1: h1 = h1;
    time = h1 + ":" + min + " " + ampm;
    jt = h1 + ":" + min;
    jap = ampm;
    timeHour = time;
    weekDay = days[day];
    morning = "Good Morning";
    noon = "Good Afrernoon";
    evening = "Good Evening";
    night = "Good Night";
    (ampm == 'AM' && h <= 9) ? (msg1 = morning, msg2 = 'Charge your day with YOGA') :
    (ampm == 'AM' && h <= 11) ? (msg1 = morning, msg2 = 'Lets take coffee') : true;
    (ampm == 'PM' && (h == 12 || h <= 2)) ? (msg1 = noon, msg2 = 'Lets complete the works') :
    (ampm == 'PM' && h <= 5) ? (msg1 = noon, msg2 = 'Take a break') :
    (ampm == 'PM' && h <= 8) ? (msg1 = evening, msg2 = 'Return to home & take your Dinner') :
    (ampm == 'PM' && h <= 11) ? (msg1 = night, msg2 = 'Early Bed, Early Rise') :
    (ampm == 'AM' && (h == 12 || h <= 4)) ? (msg1 = night, msg2 = 'Time to sleep') : true;
}
/*music player content start*/
function playSong() {
    song.src = songs[currentSong].song;
    songName.textContent = songs[currentSong].name;
    singerName.textContent = songs[currentSong].singer;
    document.getElementById("poster").src = songs[currentSong].poster;
}
/*music player content stop*/

/*stopwatch start*/
function startTimer() {
    if (!interval) {
        lastUpdateTime = new Date().getTime();
        interval = setInterval(update, 20);
    }
}

function stopTimer() {
    clearInterval(interval);
    interval = 0;
}

function resetTimer() {
    stopTimer();
    currentTimer = 0;
    mins.innerHTML = secs.innerHTML = cents.innerHTML = '00';
}

function update() {
    initCents++;
    if (initCents >= 60) {
        initCents = 0;
        initSec++;
        if (initSec >= 60) {
            initSec = 0;
            initMin++;
        }
    }
    mins.textContent = initMin ? (initMin > 9 ? initMin : "0" + initMin) : "00";
    secs.textContent = initSec ? (initSec > 9 ? initSec : "0" + initSec) : "00";
    cents.textContent = initCents > 9 ? initCents : "0" + initCents;
    startTimer()
}

function timerLap() {
    lapData.push({ id: count + 1, lapmin: initMin, lapsec: initSec, lapcent: initCents });
}
/*stopwatch stop*/

$(document).ready(function() {
    getDayTime();
    $(".home-time > p:nth-child(1)").html(msg1);
    $("#startTime > span:nth-child(1)").html(jt);
    $("#startTime > span:nth-child(2)").html(jap);
    $("#weekDay").html(weekDay);
    $(".home-time > p:nth-child(4)").html(msg2);
    $("#content-title > .title").html();
    $("#content-title > .time").html();
    /*message start*/
    $("#msgBtn").click(function() {
        $("#homeScreen,#musicMainDiv,#bottomBtnNext,#main,#swMainDiv,.message-read,#lapRow,#bottomBtnBack").css("display", "none");
        $("#msgRow").empty();
        $("#content-title > .title").html("MESSAGE");
        $("#content-title > .time").html(timeHour);
        $("#musicBtn").css("background-color", "#373762");
        $("#msgBtn").css("background-color", "#0080ff");
        $("#swBtn").css("background-color", "#373762");
        $("#musicMainDiv").children().hide();
        $("#msgMainDiv,.title,.time").css("display", "block");
        $.each(message, function(index, value) {
            if (index < 6) {
                let row = '<tr>' + '<th>' +
                    '<p class="msg-icon" style="background-color:' + value.color + ';">' +
                    '<span class="icon-let">' + value.sender.charAt(0) + '</span>' +
                    '</p >' + '</th>' + '<td>' +
                    '<p class="msg-list-name" style="cursor:pointer;" onclick="msgBox(' + value.id + ')">' + value.sender + '</p>' + '</td>' + '</tr>';
                $('#msgRow').append(row).last();
            }
        });
    });
    /*message stop*/
    /*music player start*/
    $("#musicBtn").click(function() {
        $("#homeScreen,#swMainDiv,#bottomBtnNext,#msgMainDiv,.message-read,#lapRow,#bottomBtnBack").css("display", "none");
        $("#content-title > .title").html("MUSIC");
        $("#content-title > .time").html(timeHour);
        $("#musicBtn").css("background-color", "#0080ff");
        $("#msgBtn").css("background-color", "#373762");
        $("#swBtn").css("background-color", "#373762");
        $("#musicMainDiv").css("display", "block");
        $("#musicMainDiv").children().show();
        $("#main,.title,.time").css("display", "block");
        playSong();
        //  $.ajax({
        //   url:"https://api.spotify.com/v1/playlists/4Xnj1bYhUS8Rb8cKDUASCO",
        //   type: "GET",
        //   responseType:'application/json',
        //   dataType:'jsonp'
        // }).done(function(data){
        //     console.log(data);
        // });
    });
    $("#musicPause").click(function() {
        $("#musicPause").css("display", "none");
        $("#musicPlay").css("display", "block");
        song.pause();
    });
    $("#musicPlay").click(function() {
        $("#musicPlay").css("display", "none");
        $("#musicPause").css("display", "block");
        song.play();
    });
    $("#musicPrev").click(function() {
        $("#musicPause").css("display", "none");
        $("#musicPlay").css("display", "block");
        song.pause();
        currentSong--;
        if (currentSong < 0) {
            currentSong = 2;
        }
        $(".img-poster").attr("src", songs[currentSong].poster);
        playSong();
    });
    $("#musicNext").click(function() {
        $("#musicPause").css("display", "none");
        $("#musicPlay").css("display", "block");
        song.pause();
        currentSong++;
        if (currentSong > 5) {
            currentSong = 0;
        }
        $(".img-poster").attr("src", songs[currentSong].poster);
        playSong();
    });

    song.addEventListener('timeupdate', function() {
        let position = (song.currentTime / song.duration);
        fillBar.style.width = position * 100 + '%';
        $('#handle').css("margin-left", position + '%');
    });
    /*music player end*/
    /*stopwatch start*/
    $("#lapRow").empty();
    $("#swBtn").click(function() {
        $("#homeScreen,#musicMainDiv,#msgMainDiv,.message-read,#main,#lapRow,#bottomBtnBack").css("display", "none");
        $("#content-title > .title").html("TIMER");
        $("#content-title > .time").html(timeHour);
        $("#musicBtn").css("background-color", "#373762");
        $("#msgBtn").css("background-color", "#373762");
        $("#swBtn").css("background-color", "#0080ff");
        $("#lapRow").empty();
        $("#musicMainDiv").children().hide();
        $("#swMainDiv,#bottomBtnNext,.title,.time").css("display", "block");
    });
    $("#start").click(function() {
        $("#start").css("display", "none");
        $("#stop").css("display", "block");
        startTimer();
    });
    $("#stop").click(function() {
        $("#start").css("display", "block");
        $("#stop").css("display", "none");
        stopTimer();
    });
    $("#reset").click(function() {
        $("#start").css("display", "block");
        $("#stop").css("display", "none");
        $("#lapCount").html('LAP&nbsp;:&nbsp;' + 0);
        count = 0;
        resetTimer();
    });
    $("#lap").click(function() {
        timerLap();
        count = count + 1;
        $("#lapCount").html('LAP&nbsp;:&nbsp;' + count);
    });
    $("#bottomBtnNext").click(function() {
        $("#lapRow").empty();
        $("#swMainDiv,#bottomBtnNext,#musicMainDiv,#msgMainDiv,.message-read,#main").css("display", "none");
        $("#bottomBtnBack,#lapStoreList,#lapRow").css("display", "block");
        $.each(lapData, function(index, value) {
            if (index < count) {
                let row = '<tr>' + '<td scope="row" ><p class="lap-id">#' + value.id + '</p></td>' + '<td><p class="lap-text">' + value.lapmin +
                    ':' + value.lapsec + ':' + value.lapcent + '</p></td>' + '</tr>';
                $('#lapRow').append(row).last();
            }
        });
    });
    $("#bottomBtnBack").click(function() {
        $("#swMainDiv,#bottomBtnNext,#lapRow").css("display", "block");
        $("#bottomBtnBack,#lapStoreList,#musicMainDiv,#msgMainDiv,.message-read,#main").css("display", "none");
        $("#lapRow").empty();
    });
    /*stopwatch stop*/
    /*double click homeScreen start*/
    $("#msgBtn,#musicBtn,#swBtn").dblclick(function() {
        $(".title,.time,#musicMainDiv,#msgMainDiv,.message-read,#main,#lapRow,#bottomBtnBack,#swMainDiv,#bottomBtnNext").css("display", "none");
        $("#msgBtn,#musicBtn,#swBtn").css("background-color", "#373762");
        $("#homeScreen").fadeIn();
    });
    /*double click homeScreen end*/
});