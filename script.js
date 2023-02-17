console.log(
  "Скорее всего опять не будет работать погода , что довольно странно. В люом случае на локалке она работала, за любыми доказательствами можете написать мне в телеграм @amalkkaa"
);
//MUSIC PLAYER
const player = document.querySelector(".player"),
  playBtn = document.querySelector("#play-stop"),
  prevBtn = document.querySelector("#prev"),
  nextBtn = document.querySelector("#next"),
  audio = document.querySelector(".audio"),
  progresscontainer = document.querySelector(".progress-bar");
progress = document.querySelector(".progress");
const songs = [
  "Aqua Caelestis",
  "Ennio Morricone",
  "River Flows In You",
  "Summer Wind",
];
const songsList = [
  "first-track",
  "second-track",
  "third-track",
  "fourth-track",
];
let songIndex = 0;
function loadSong(song) {
  thisSong();
  audio.src = `./files/music/${song}.mp3`;
}
loadSong(songs[songIndex]);
function playSong() {
  player.classList.add("play");
  playBtn.src = "./files/icons/pause.svg";
  audio.play();
}
function pauseSong() {
  player.classList.remove("play");
  playBtn.src = "./files/icons/play.svg";
  audio.pause();
}
function thisSong() {
  document.querySelector(`#${songsList[songIndex]}`).classList.toggle("active");
}
playBtn.addEventListener("click", () => {
  const isPlaying = player.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
function nextSong() {
  thisSong();
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
function prevSong() {
  thisSong();
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
nextBtn.addEventListener("click", () => {
  nextSong();
});
prevBtn.addEventListener("click", () => {
  prevSong();
});
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}
audio.addEventListener("timeupdate", updateProgress);
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
progresscontainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
//MUSIC PLAYER

//WEATHER FORECAST
//http://api.openweathermap.org/data/2.5/weather?q=Minsk&appid=83de8b24cfc4f11c6a54a37552b91cdc

const link =
  "https://api.openweathermap.org/data/2.5/weather?appid=83de8b24cfc4f11c6a54a37552b91cdc&units=metric";
let input = document.querySelector("#search");
let CityName;
let store = {
  city: "Minsk",
  temperature: 0,
  weather_descriptions: 0,
  humidity: 0,
  wind_speed: 0,
};
input.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    store.city = input.value;
    fetchData();
  }
});

const fetchData = async () => {
  try {
    const result = await fetch(`${link}&q=${store.city}`);
    const data = await result.json();
    const {
      weather: [{ description, icon }],
      main: { temp, humidity },
      wind: { speed },
    } = data;
    store = {
      ...store,
      temp,
      weather_descriptions: description,
      icon,
      humidity,
      speed,
    };

    document.getElementById(
      "wet-icon"
    ).src = `http://openweathermap.org/img/w/${store.icon}.png`;
    document.getElementById("temperature").innerHTML = `${store.temp.toFixed(
      0
    )}°`;
    document.getElementById(
      "description"
    ).innerHTML = `${store.weather_descriptions}`;
    document.getElementById(
      "wind-speed"
    ).innerHTML = `Wind speed: ${store.speed.toFixed(0)} m/s`;
    document.getElementById(
      "humidity"
    ).innerHTML = `Humidity: ${store.humidity}%`;
  } catch (err) {
    alert("Wrong name of the city");
  }
};

fetchData();

//WEATHER FORECAST

//ClOCK
window.onload = function () {
  window.setInterval(function () {
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "December",
    ];
    var date = new Date();
    var hours = date.getHours();
    if (hours >= 18 && hours < 24) {
      document.querySelector(".greeting").innerHTML = `Good evening,`;
      timeOfDay = "evening";
    }
    if (hours >= 6 && hours < 12) {
      document.querySelector(".greeting").innerHTML = `Good morning,`;
      timeOfDay = "morning";
    }
    if (hours >= 12 && hours < 18) {
      document.querySelector(".greeting").innerHTML = `Good afternoon,`;
      timeOfDay = "afternoon";
    }
    if (hours >= 0 && hours < 6) {
      document.querySelector(".greeting").innerHTML = `Good night,`;
      timeOfDay = "night";
    }
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var dayNum = date.getDay();
    var weekDay = weekDays[dayNum];
    var month = months[date.getMonth()];
    var day = date.toString().split(" ")[2];
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var time = hours + ":" + minutes + ":" + seconds;
    var today = weekDay + ", " + month + " " + day;
    document.querySelector(".date").innerHTML = `${today}`;
    document.querySelector(".time").innerHTML = `${time}`;
    return timeOfDay;
  });
};
//CLOCK

//GREETING
const name = document.querySelector(".name");
if (localStorage.getItem("name") !== null) {
  document.querySelector("#name").innerHTML = `${localStorage.getItem("name")}`;
  name.classList.add("inactive");
}

name.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    let user = name.value;
    localStorage.setItem("name", user);
    document.querySelector("#name").innerHTML = `${localStorage.getItem(
      "name"
    )}`;
    name.classList.add("inactive");
  }
});

//GREETING

//BACKGROUND CHANGING
function timeOfDay() {
  var date = new Date();
  var hours = date.getHours();
  if (hours >= 18 && hours < 24) {
    return "evening";
  }
  if (hours >= 6 && hours < 12) {
    return "morning";
  }
  if (hours >= 12 && hours < 18) {
    return "afternoon";
  }
  if (hours >= 0 && hours < 6) {
    return "night";
  }
}
let backIndex = 1;
document.body.style.backgroundImage = `url(./files/img/${timeOfDay()}/01.jpg)`;
const prevBack = document.querySelector("#left");
const nextBack = document.querySelector("#right");

prevBack.addEventListener("click", () => {
  if (backIndex == 1) {
    backIndex = 21;
  }
  backIndex--;
  if (backIndex < 10) {
    backIndex = "0" + backIndex;
  }
  document.body.style.backgroundImage = `url(./files/img/${timeOfDay}/${backIndex}.jpg)`;
  backIndex = Number(backIndex);
});
nextBack.addEventListener("click", () => {
  if (backIndex == 20) {
    backIndex = 0;
  }
  backIndex++;
  if (backIndex < 10) {
    backIndex = "0" + backIndex;
  }
  document.body.style.backgroundImage = `url(./files/img/${timeOfDay}/${backIndex}.jpg)`;
  backIndex = Number(backIndex);
});
//BACKGROUD CHANGING

//QUOTES
const quotes = [
  {
    quote: "Life isn’t about getting and having, it’s about giving and being.",
    author: "Kevin Kruse",
  },
  {
    quote: "Whatever the mind of man can conceive and believe, it can achieve.",
    author: "Napoleon Hill",
  },
  {
    quote: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
  },
  {
    quote:
      "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
    author: "Robert Frost",
  },
  {
    quote: "I attribute my success to this: I never gave or took any excuse.",
    author: "Florence Nightingale",
  },
  {
    quote: "You miss 100% of the shots you don’t take.",
    author: "Wayne Gretzky",
  },
  {
    quote:
      "I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed.",
    author: "Michael Jordan",
  },
  {
    quote:
      "The most difficult thing is the decision to act, the rest is merely tenacity.",
    author: "Amelia Earhart",
  },
  {
    quote: "Every strike brings me closer to the next home run.",
    author: "Babe Ruth",
  },
  {
    quote: "Definiteness of purpose is the starting point of all achievement.",
    author: "W. Clement Stone",
  },
  {
    quote: "We must balance conspicuous consumption with conscious capitalism.",
    author: "Kevin Kruse",
  },
  {
    quote: "Life is what happens to you while you’re busy making other plans.",
    author: "John Lennon",
  },
  {
    quote: "We become what we think about.",
    author: "Earl Nightingale",
  },
  {
    quote:
      "Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover.",
    author: "Mark Twain",
  },
  {
    quote: "Life is 10% what happens to me and 90% of how I react to it.",
    author: "Charles Swindoll",
  },
  {
    quote:
      "The most common way people give up their power is by thinking they don’t have any.",
    author: "Alice Walker",
  },
  {
    quote: "The mind is everything. What you think you become.",
    author: "Buddha",
  },
  {
    quote:
      "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    quote: "An unexamined life is not worth living.",
    author: "Socrates",
  },
  {
    quote: "Eighty percent of success is showing up.",
    author: "Woody Allen",
  },
  {
    quote:
      "Your time is limited, so don’t waste it living someone else’s life.",
    author: "Steve Jobs",
  },
  {
    quote: "Winning isn’t everything, but wanting to win is.",
    author: "Vince Lombardi",
  },
  {
    quote:
      "I am not a product of my circumstances. I am a product of my decisions.",
    author: "Stephen Covey",
  },
  {
    quote:
      "Every child is an artist.  The problem is how to remain an artist once he grows up.",
    author: "Pablo Picasso",
  },
  {
    quote:
      "You can never cross the ocean until you have the courage to lose sight of the shore.",
    author: "Christopher Columbus",
  },
  {
    quote:
      "I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
    author: "Maya Angelou",
  },
  {
    quote: "Either you run the day, or the day runs you.",
    author: "Jim Rohn",
  },
  {
    quote: "Whether you think you can or you think you can’t, you’re right.",
    author: "Henry Ford",
  },
  {
    quote:
      "The two most important days in your life are the day you are born and the day you find out why.",
    author: "Mark Twain",
  },
  {
    quote:
      "Whatever you can do, or dream you can, begin it.  Boldness has genius, power and magic in it.",
    author: "Johann Wolfgang von Goethe",
  },
  {
    quote: "The best revenge is massive success.",
    author: "Frank Sinatra",
  },
  {
    quote:
      "People often say that motivation doesn’t last. Well, neither does bathing.  That’s why we recommend it daily.",
    author: "Zig Ziglar",
  },
  {
    quote: "Life shrinks or expands in proportion to one’s courage.",
    author: "Anais Nin",
  },
  {
    quote:
      "If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced.",
    author: "Vincent Van Gogh",
  },
  {
    quote:
      "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.",
    author: "Aristotle",
  },
  {
    quote:
      "Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.",
    author: "Jesus",
  },
  {
    quote:
      "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
  },
  {
    quote:
      "Go confidently in the direction of your dreams.  Live the life you have imagined.",
    author: "Henry David Thoreau",
  },
  {
    quote:
      "When I stand before God at the end of my life, I would hope that I would not have a single bit of talent left and could say, I used everything you gave me.",
    author: "Erma Bombeck",
  },
  {
    quote:
      "Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.",
    author: "Booker T. Washington",
  },
  {
    quote:
      "Certain things catch your eye, but pursue only those that capture the heart.",
    author: " Ancient Indian Proverb",
  },
  {
    quote: "Believe you can and you’re halfway there.",
    author: "Theodore Roosevelt",
  },
  {
    quote: "Everything you’ve ever wanted is on the other side of fear.",
    author: "George Addair",
  },
  {
    quote:
      "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.",
    author: "Plato",
  },
  {
    quote:
      "Teach thy tongue to say, “I do not know,” and thous shalt progress.",
    author: "Maimonides",
  },
  {
    quote: "Start where you are. Use what you have.  Do what you can.",
    author: "Arthur Ashe",
  },
  {
    quote:
      "When I was 5 years old, my mother always told me that happiness was the key to life.  When I went to school, they asked me what I wanted to be when I grew up.  I wrote down ‘happy’.  They told me I didn’t understand the assignment, and I told them they didn’t understand life.",
    author: "John Lennon",
  },
  {
    quote: "Fall seven times and stand up eight.",
    author: "Japanese Proverb",
  },
  {
    quote:
      "When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us.",
    author: "Helen Keller",
  },
  {
    quote: "Everything has beauty, but not everyone can see.",
    author: "Confucius",
  },
  {
    quote:
      "How wonderful it is that nobody need wait a single moment before starting to improve the world.",
    author: "Anne Frank",
  },
  {
    quote: "When I let go of what I am, I become what I might be.",
    author: "Lao Tzu",
  },
  {
    quote:
      "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
    author: "Maya Angelou",
  },
  {
    quote:
      "Happiness is not something readymade.  It comes from your own actions.",
    author: "Dalai Lama",
  },
  {
    quote:
      "If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.",
    author: "Sheryl Sandberg",
  },
  {
    quote:
      "First, have a definite, clear practical ideal; a goal, an objective. Second, have the necessary means to achieve your ends; wisdom, money, materials, and methods. Third, adjust all your means to that end.",
    author: "Aristotle",
  },
  {
    quote: "If the wind will not serve, take to the oars.",
    author: "Latin Proverb",
  },
  {
    quote:
      "You can’t fall if you don’t climb.  But there’s no joy in living your whole life on the ground.",
    author: "Unknown",
  },
  {
    quote:
      "We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.",
    author: "Marie Curie",
  },
  {
    quote:
      "Too many of us are not living our dreams because we are living our fears.",
    author: "Les Brown",
  },
  {
    quote:
      "Challenges are what make life interesting and overcoming them is what makes life meaningful.",
    author: "Joshua J. Marine",
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington",
  },
  {
    quote:
      "I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.",
    author: "Leonardo da Vinci",
  },
  {
    quote:
      "Limitations live only in our minds.  But if we use our imaginations, our possibilities become limitless.",
    author: "Jamie Paolinetti",
  },
  {
    quote:
      "You take your life in your own hands, and what happens? A terrible thing, no one to blame.",
    author: "Erica Jong",
  },
  {
    quote:
      "What’s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.",
    author: "Bob Dylan",
  },
  {
    quote: "I didn’t fail the test. I just found 100 ways to do it wrong.",
    author: "Benjamin Franklin",
  },
  {
    quote:
      "In order to succeed, your desire for success should be greater than your fear of failure.",
    author: "Bill Cosby",
  },
  {
    quote: "A person who never made a mistake never tried anything new.",
    author: " Albert Einstein",
  },
  {
    quote:
      "The person who says it cannot be done should not interrupt the person who is doing it.",
    author: "Chinese Proverb",
  },
  {
    quote: "There are no traffic jams along the extra mile.",
    author: "Roger Staubach",
  },
  {
    quote: "It is never too late to be what you might have been.",
    author: "George Eliot",
  },
  {
    quote: "You become what you believe.",
    author: "Oprah Winfrey",
  },
  {
    quote: "I would rather die of passion than of boredom.",
    author: "Vincent van Gogh",
  },
  {
    quote:
      "A truly rich man is one whose children run into his arms when his hands are empty.",
    author: "Unknown",
  },
  {
    quote:
      "It is not what you do for your children, but what you have taught them to do for themselves, that will make them successful human beings.",
    author: "Ann Landers",
  },
  {
    quote:
      "If you want your children to turn out well, spend twice as much time with them, and half as much money.",
    author: "Abigail Van Buren",
  },
  {
    quote:
      "Build your own dreams, or someone else will hire you to build theirs.",
    author: "Farrah Gray",
  },
  {
    quote:
      "The battles that count aren’t the ones for gold medals. The struggles within yourself–the invisible battles inside all of us–that’s where it’s at.",
    author: "Jesse Owens",
  },
  {
    quote: "Education costs money.  But then so does ignorance.",
    author: "Sir Claus Moser",
  },
  {
    quote:
      "I have learned over the years that when one’s mind is made up, this diminishes fear.",
    author: "Rosa Parks",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    quote:
      "If you look at what you have in life, you’ll always have more. If you look at what you don’t have in life, you’ll never have enough.",
    author: "Oprah Winfrey",
  },
  {
    quote:
      "Remember that not getting what you want is sometimes a wonderful stroke of luck.",
    author: "Dalai Lama",
  },
  {
    quote: "You can’t use up creativity.  The more you use, the more you have.",
    author: "Maya Angelou",
  },
  {
    quote: "Dream big and dare to fail.",
    author: "Norman Vaughan",
  },
  {
    quote:
      "Our lives begin to end the day we become silent about things that matter.",
    author: "Martin Luther King Jr.",
  },
  {
    quote: "Do what you can, where you are, with what you have.",
    author: "Teddy Roosevelt",
  },
  {
    quote:
      "If you do what you’ve always done, you’ll get what you’ve always gotten.",
    author: "Tony Robbins",
  },
  {
    quote: "Dreaming, after all, is a form of planning.",
    author: "Gloria Steinem",
  },
  {
    quote:
      "It’s your place in the world; it’s your life. Go on and do all you can with it, and make it the life you want to live.",
    author: "Mae Jemison",
  },
  {
    quote:
      "You may be disappointed if you fail, but you are doomed if you don’t try.",
    author: "Beverly Sills",
  },
  {
    quote: "Remember no one can make you feel inferior without your consent.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "Life is what we make it, always has been, always will be.",
    author: "Grandma Moses",
  },
  {
    quote:
      "The question isn’t who is going to let me; it’s who is going to stop me.",
    author: "Ayn Rand",
  },
  {
    quote:
      "When everything seems to be going against you, remember that the airplane takes off against the wind, not with it.",
    author: "Henry Ford",
  },
  {
    quote:
      "It’s not the years in your life that count. It’s the life in your years.",
    author: "Abraham Lincoln",
  },
  {
    quote: "Change your thoughts and you change your world.",
    author: "Norman Vincent Peale",
  },
  {
    quote:
      "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "Nothing is impossibleweathe, the word itself says, “I’m possible!”",
    author: "–Audrey Hepburn",
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    quote: "If you can dream it, you can achieve it.",
    author: "Zig Ziglar",
  },
];
function randomQuote() {
  let random = quotes[Math.floor(Math.random() * quotes.length)];
  document.querySelector("#quote").innerText = `“${random.quote}.”`;
  document.querySelector("#author").innerText = random.author;
}
randomQuote();
const reloadQuote = document.querySelector(".reload-icon");
reloadQuote.addEventListener("click", function () {
  randomQuote();
});
//QUOTATION

//TO_DO LIST
const toDo = document.querySelector(".do");
const toDos = document.querySelector(".to-dos");
toDo.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    var paragraph = document.createElement("p");
    paragraph.classList.add("paragraph");
    paragraph.innerText = toDo.value;
    toDos.appendChild(paragraph);
    toDo.value = "";
    paragraph.addEventListener("click", function () {
      paragraph.style.textDecoration = "line-through";
    });
    paragraph.addEventListener("dblclick", function () {
      toDos.removeChild(paragraph);
    });
  }
});
//TO-DO LIST

//SETTINGS
let playerBox = document.getElementById("player-box");
let weatherBox = document.getElementById("weather-box");
let greetingBox = document.getElementById("greeting-box");
let quoteBox = document.getElementById("quote-box");
let toDoBox = document.getElementById("to-do-box");
let cross = document.querySelector(".cross-icon");
let settings = document.querySelector(".settings");
cross.addEventListener("click", function () {
  document.querySelector(".pop-up").classList.toggle("active");
});
settings.addEventListener("click", function () {
  document.querySelector(".pop-up").classList.toggle("active");
});
playerBox.addEventListener("click", function () {
  if (playerBox.checked != true) {
    document.querySelector(".player").style.opacity = "0";
  }
  if (playerBox.checked == true) {
    document.querySelector(".player").style.opacity = "1.0";
  }
});
weatherBox.addEventListener("click", function () {
  if (weatherBox.checked != true) {
    document.querySelector(".weather").style.opacity = "0";
  }
  if (weatherBox.checked == true) {
    document.querySelector(".weather").style.opacity = "1.0";
  }
});
greetingBox.addEventListener("click", function () {
  if (greetingBox.checked != true) {
    document.querySelector(".greeting").style.opacity = "0";
    document.querySelector("#name").style.opacity = "0";
    document.querySelector(".name").style.opacity = "0";
  }
  if (greetingBox.checked == true) {
    document.querySelector(".greeting").style.opacity = "1.0";
    document.querySelector("#name").style.opacity = "1";
    document.querySelector(".name").style.opacity = "1";
  }
});
quoteBox.addEventListener("click", function () {
  if (quoteBox.checked != true) {
    document.querySelector(".quotes").style.opacity = "0";
    document.querySelector("#author").style.opacity = "0";
    document.querySelector(".reload-icon").style.opacity = "0";
  }
  if (quoteBox.checked == true) {
    document.querySelector(".quotes").style.opacity = "1.0";
    document.querySelector("#author").style.opacity = "1";
    document.querySelector(".reload-icon").style.opacity = "1";
  }
});
toDoBox.addEventListener("click", function () {
  if (toDoBox.checked != true) {
    document.querySelector(".to-do-list").style.opacity = "0";
  }
  if (toDoBox.checked == true) {
    document.querySelector(".to-do-list").style.opacity = "1.0";
  }
});
//SETTINGS
