$(document).ready(function() {
  $("#logo").hover(
  function() {
    $(this).find('img').attr("src", "images/image2.jpeg");
  },
  function() {
    $(this).find('img').attr("src", "images/image1.jpeg");
  }
  );
  $("button").hover(
  function() {
    $(this).addClass("highlight");
  },
  function() {
    $(this).removeClass("highlight");
  }
  );
});

$(document).ready(function(){
  $('#tutorialLink').on('click', 'button', function() {
    $('#tutorial').fadeToggle(400, "linear");    
  });
});
$(document).ready(function(){
  $('#testStatsLink').on('click', 'button', function() {
    $('#testStats').fadeToggle(400, "linear");    
  });
});
var startDate = new Date();
var hpStartDate = new Date();
var correction = 0;
var hpCorrection = 0;
var fighting = false;
var shop = [];
var tier = [ "1", "2", "3", "4", "5", "Food"];
var berserkScore = 5;
var invulnerableScore = 4;
function ranInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
document.getElementById("sellItems").style.visibility='hidden';
document.getElementById("useItems").style.visibility='hidden';
document.getElementById("buy").style.visibility='hidden';
document.getElementById("newStock").style.visibility='hidden'; 
document.getElementById("findItem").style.visibility='hidden';
document.getElementById("shopStock").style.visibility='hidden'; 
document.getElementById("shop_Tier").style.visibility='hidden'; 
document.getElementById("attackMouse").style.visibility='hidden';
document.getElementById("attackRat").style.visibility='hidden';
document.getElementById("attackDog").style.visibility='hidden';
document.getElementById("attackWolf").style.visibility='hidden';
document.getElementById("attackGoblin").style.visibility='hidden';
document.getElementById("attackOrc").style.visibility='hidden';
document.getElementById("attackOgre").style.visibility='hidden';
document.getElementById("berserkMouse").style.visibility='hidden';
document.getElementById("berserkRat").style.visibility='hidden';
document.getElementById("berserkDog").style.visibility='hidden';
document.getElementById("berserkWolf").style.visibility='hidden';
document.getElementById("berserkGoblin").style.visibility='hidden';
document.getElementById("berserkOrc").style.visibility='hidden';
document.getElementById("berserkOgre").style.visibility='hidden';
document.getElementById("invulnerableMouse").style.visibility='hidden';
document.getElementById("invulnerableRat").style.visibility='hidden';
document.getElementById("invulnerableDog").style.visibility='hidden';
document.getElementById("invulnerableWolf").style.visibility='hidden';
document.getElementById("invulnerableGoblin").style.visibility='hidden';
document.getElementById("invulnerableOrc").style.visibility='hidden';
document.getElementById("invulnerableOgre").style.visibility='hidden';
document.getElementById("close").style.visibility='hidden';
var mouse = {
  name: "Mouse",
  plural: "Mice",
  energyCost: 3,
  level: 1,
  hp: 6,
  maxHp: 6,
  str: 1,
  hit: 3,
  def: 2,
  dodge: 1,
  xpWin: 9,
  xpDraw: 5,
  xpLose: 3,
  //  dropTable: "lowDrop",
  realDifficulty: 1,
  difficulty: 1,
  defeats: 0,
  levelUps: 0
};
var rat = {
  name: "Rat",
  plural: "Rats",
  energyCost: 4,
  level: 3,
  hp: 22,
  maxHp: 22,
  str: 5,
  hit: 6,
  def: 4,
  dodge: 3,
  xpWin: 15,
  xpDraw: 7,
  xpLose: 4,
  //  dropTable: "lowDrop",
  realDifficulty: 3,
  difficulty: 3,
  defeats: 0,
  levelUps: 0
};
var dog = {
  name: "Dog",
  plural: "Dogs",
  energyCost: 5,
  level: 5,
  hp: 41,
  maxHp: 41,
  str: 8,
  hit: 9,
  def: 8,
  dodge: 6,
  xpWin: 21,
  xpDraw: 10,
  xpLose: 5,
  //  dropTable: "lowDrop",
  realDifficulty: 5,
  difficulty: 5,
  defeats: 0,
  levelUps: 0
};
var wolf = {
  name: "Wolf",
  plural: "Wolves",
  level: 7,
  energyCost: 6,
  hp: 67,
  maxHp: 67,
  str: 14,
  hit: 12,
  def: 10,
  dodge: 12,
  xpWin: 27,
  xpDraw: 14,
  xpLose: 7,
  //  dropTable: "lowDrop",
  realDifficulty: 8,
  difficulty: 8,
  defeats: 0,
  levelUps: 0
};
var goblin = {
  name: "Goblin",
  plural: "Goblins",
  level: 10,
  energyCost: 7,
  hp: 90,
  maxHp: 90,
  str: 19,
  hit: 20,
  def: 17,
  dodge: 17,
  xpWin: 38,
  xpDraw: 18,
  xpLose: 9,
  //  dropTable: "medDrop",
  realDifficulty: 11,
  difficulty: 11,
  defeats: 0,
  levelUps: 0
};
var orc = {
  name: "Orc",
  plural: "Orcs",
  level: 13,
  energyCost: 8,
  hp: 99,
  maxHp: 99,
  str: 27,
  hit: 26,
  def: 24,
  dodge: 24,
  xpWin: 48,
  xpDraw: 24,
  xpLose: 12,
  //  dropTable: "medDrop",
  realDifficulty: 14,
  difficulty: 14,
  defeats: 0,
  levelUps: 0
};
var ogre = {
  name: "Ogre",
  plural: "Ogres",
  level: 16,
  energyCost: 9,
  hp: 110,
  maxHp: 110,
  str: 38,
  hit: 32,
  def: 37,
  dodge: 29,
  xpWin: 59,
  xpDraw: 29,
  xpLose: 15,
  //  dropTable: "medDrop",
  realDifficulty: 17,
  difficulty: 17,
  defeats: 0,
  levelUps: 0
};
function stats() {
  mouseStats.innerHTML = mouse.name + ", " + mouse.str + ", " + mouse.hit + ", " + mouse.def + ", " + mouse.dodge + ", " + mouse.maxHp + ", " + mouse.xpWin + ", " + mouse.difficulty + ", " + ((mouse.levelUps*5)+mouse.defeats);
  ratStats.innerHTML = rat.name + ", " + rat.str + ", " + rat.hit + ", " + rat.def + ", " + rat.dodge + ", " + rat.maxHp + ", " + rat.xpWin + ", " + rat.difficulty + ", " + ((rat.levelUps*5)+rat.defeats);
  dogStats.innerHTML = dog.name + ", " + dog.str + ", " + dog.hit + ", " + dog.def + ", " + dog.dodge + ", " + dog.maxHp + ", " + dog.xpWin + ", " + dog.difficulty + ", " + ((dog.levelUps*5)+dog.defeats);
  wolfStats.innerHTML = wolf.name + ", " + wolf.str + ", " + wolf.hit + ", " + wolf.def + ", " + wolf.dodge + ", " + wolf.maxHp + ", " + wolf.xpWin + ", " + wolf.difficulty + ", " + ((wolf.levelUps*5)+wolf.defeats);
  goblinStats.innerHTML = goblin.name + ", " + goblin.str + ", " + goblin.hit + ", " + goblin.def + ", " + goblin.dodge + ", " + goblin.maxHp + ", " + goblin.xpWin + ", " + goblin.difficulty + ", " + ((goblin.levelUps*5)+goblin.defeats);
  orcStats.innerHTML = orc.name + ", " + orc.str + ", " + orc.hit + ", " + orc.def + ", " + orc.dodge + ", " + orc.maxHp + ", " + orc.xpWin + ", " + orc.difficulty + ", " + ((orc.levelUps*5)+orc.defeats);
  ogreStats.innerHTML = ogre.name + ", " + ogre.str + ", " + ogre.hit + ", " + ogre.def + ", " + ogre.dodge + ", " + ogre.maxHp + ", " + ogre.xpWin + ", " + ogre.difficulty + ", " + ((ogre.levelUps*5)+ogre.defeats);
}
function showMouse() {
    $('.mouse').removeClass('noDisplay'); 
    $('.rat').addClass('noDisplay');
    $('.dog').addClass('noDisplay'); 
    $('.wolf').addClass('noDisplay');   
    $('.goblin').addClass('noDisplay');   
    $('.orc').addClass('noDisplay'); 
    $('.ogre').addClass('noDisplay'); 
}
function showRat() {
    $('.rat').removeClass('noDisplay'); 
    $('.mouse').addClass('noDisplay'); 
    $('.dog').addClass('noDisplay'); 
    $('.wolf').addClass('noDisplay');  
    $('.goblin').addClass('noDisplay');    
    $('.orc').addClass('noDisplay');    
    $('.ogre').addClass('noDisplay');
}
function showDog() {
    $('.dog').removeClass('noDisplay'); 
    $('.mouse').addClass('noDisplay'); 
    $('.rat').addClass('noDisplay');
    $('.wolf').addClass('noDisplay');   
    $('.goblin').addClass('noDisplay');
    $('.orc').addClass('noDisplay');   
    $('.ogre').addClass('noDisplay');      
}
function showWolf() {
    $('.wolf').removeClass('noDisplay'); 
    $('.mouse').addClass('noDisplay'); 
    $('.rat').addClass('noDisplay');
    $('.dog').addClass('noDisplay');  
    $('.goblin').addClass('noDisplay');  
    $('.orc').addClass('noDisplay');      
    $('.ogre').addClass('noDisplay');      
}
function showGoblin() {
    $('.goblin').removeClass('noDisplay'); 
    $('.mouse').addClass('noDisplay'); 
    $('.rat').addClass('noDisplay');
    $('.dog').addClass('noDisplay');  
    $('.wolf').addClass('noDisplay'); 
    $('.orc').addClass('noDisplay'); 
    $('.ogre').addClass('noDisplay');      
}
function showOrc() {
    $('.orc').removeClass('noDisplay'); 
    $('.mouse').addClass('noDisplay'); 
    $('.rat').addClass('noDisplay');
    $('.dog').addClass('noDisplay');  
    $('.wolf').addClass('noDisplay');  
    $('.goblin').addClass('noDisplay');  
    $('.ogre').addClass('noDisplay');      
}
function showOgre() {
    $('.ogre').removeClass('noDisplay'); 
    $('.mouse').addClass('noDisplay'); 
    $('.rat').addClass('noDisplay');
    $('.dog').addClass('noDisplay');  
    $('.wolf').addClass('noDisplay');  
    $('.goblin').addClass('noDisplay'); 
    $('.orc').addClass('noDisplay');      
}

function fight(enemy) {  
  this.updateStatus();
  fightResult.innerHTML = "";
  result.innerHTML = "";
  other.innerHTML = "";
  yourHP.innerHTML = "";
  enemyHP.innerHTML = "";
  if (this.points > 0) {
    result.innerHTML = "You should spend your attribute points before you fight.";
  }
  else {
    if (fighting) {
      result.innerHTML = "You are already in a fight, finish your current battle first.";
    }
    else if (this.energy < enemy.energyCost) {
      result.innerHTML = "You don't have enough energy to fight a " + enemy.name + ". You regain 1 energy every minute.";
    }
    else if (this.level < enemy.level) {
      result.innerHTML = "You need to be at least level " + enemy.level + " to fight a " + enemy.name + ". You should fight something else.";
    }
    else {
      if (this.energy === this.maxEnergy) {
        startDate = new Date();
      }
  fighting = true;
  $('#wrapper').removeClass('noDisplay');
  $('#stock').addClass('noDisplay');
  if (enemy.name=="Mouse") {    
    showMouse();
  }
  else if (enemy.name=="Rat") {    
    showRat();
  }   
  else if (enemy.name=="Dog") {    
    showDog();
  }  
  else if (enemy.name=="Wolf") {    
    showWolf();
  }  
  else if (enemy.name=="Goblin") {    
    showGoblin();
  }  
  else if (enemy.name=="Orc") {    
    showOrc();
  }  
  else if (enemy.name=="Ogre") {    
    showOgre();
  }        
  enemy.hp = enemy.maxHp;
  document.getElementById("attack" + enemy.name).style.visibility='visible';
  this.energy -= enemy.energyCost;
  var yourDamageThisRound = 0;
  var enemyDamageThisRound = 0;
  var space = "<br/>";
  yourHP.innerHTML = "Your health: " + this.hp;
  enemyHP.innerHTML = enemy.name + " health: " + enemy.hp;
  var self = this;  
  function enemyLevel() {
    if(enemy.defeats>=5) {
      enemy.levelUps ++;
      enemy.defeats -= 5;
      enemy.realDifficulty += 0.7,
      enemy.difficulty = Math.floor(enemy.realDifficulty);      
      enemy.maxHp += 1 + Math.floor(enemy.maxHp/20);
      enemy.str = (enemy.str + 1) + Math.floor(enemy.str/20);
      enemy.hit = (enemy.hit + 1) + Math.floor(enemy.hit/20);
      enemy.def = (enemy.def + 1) + Math.floor(enemy.def/20);
      enemy.dodge = (enemy.dodge + 1) + Math.floor(enemy.dodge/20);
      enemy.xpWin = (enemy.xpWin + 1) + Math.floor(enemy.xpWin/30);
      enemy.xpDraw = (enemy.xpDraw + 1) + Math.floor(enemy.xpDraw/25);
      enemy.xpLose = (enemy.xpLose + 1) + Math.floor(enemy.xpLose/20);
      other.innerHTML = "The " + enemy.plural + " are growing wise to you. Be careful."
    }
  }
  attack = function()  {
    var randomize = (Math.random(0,1) + 0.2);
    var score = Math.floor((self.luck/10)/randomize); 
    highRoll = Math.floor(enemy.level/3) + 4;
    scaler = Math.floor(enemy.level/5);
    enemyRoll = ranInt(1, highRoll);
    yourRoll = ranInt(1, highRoll) + score;
      if (((self.str + yourRoll) - (enemy.def + enemyRoll)) > 0){
        if ((self.hit + yourRoll) - (enemy.dodge + enemyRoll) > (2 + scaler)) {
          yourDamageThisRound = 2* ((self.str + yourRoll) - (enemy.def + enemyRoll));         
        }
        else if ((self.hit + yourRoll) - (enemy.dodge + enemyRoll) < 1) {
          yourDamageThisRound = 0;          
        }
        else {
          yourDamageThisRound = (self.str + yourRoll) - (enemy.def + enemyRoll);         
        }
      }
      else {
        if ((self.hit + yourRoll) - (enemy.dodge + enemyRoll) > (2 + scaler)) {
          yourDamageThisRound = 2 + scaler;         
        }
        else if ((self.hit + yourRoll) - (enemy.dodge + enemyRoll) < 1) {
          yourDamageThisRound = 0;      
        }
        else {
          yourDamageThisRound = 1;          
        }
      }
  if (yourDamageThisRound>=10) {
    $('#hit').css('left', '510px');
  }
  else {
    $('#hit').css('left', '525px');  
  }      
  hit.innerHTML = " " + yourDamageThisRound;   
  enemy.hp -= yourDamageThisRound; 
  enemyHP.innerHTML = enemy.name + " health: " + enemy.hp;
      if (((enemy.str + enemyRoll) - (self.def + yourRoll)) > 0 ){
        if ((enemy.hit + enemyRoll) - (self.dodge + yourRoll) > (2 + scaler)) {
          enemyDamageThisRound = 2* ((enemy.str + enemyRoll) - (self.def + yourRoll));          
        }
        else if ((enemy.hit + enemyRoll) - (self.dodge + yourRoll) < 1) {
          enemyDamageThisRound = 0;         
        }
        else {
          enemyDamageThisRound = (enemy.str + enemyRoll) - (self.def + yourRoll);         
        }
      }
      else {
        if ((enemy.hit + enemyRoll) - (self.dodge + yourRoll) > (2 + scaler)) {
          enemyDamageThisRound = (2 + scaler);         
        }
        else if ((enemy.hit + enemyRoll) - (self.dodge + yourRoll) < 1) {
          enemyDamageThisRound = 0;         
        }
        else {
          enemyDamageThisRound = 1;          
        } 
      }
  if (enemyDamageThisRound>=10) {
    $('#enemyhit').css('left', '410px');
  }
  else {
    $('#enemyhit').css('left', '425px');  
  }         
  enemyhit.innerHTML = enemyDamageThisRound;
  if (this.hp === this.maxHp && enemyDamageThisRound>0) {
        hpStartDate = new Date();
      }  
  self.hp -= enemyDamageThisRound;
  yourHP.innerHTML = "Your health: " + self.hp;
  if (berserkScore > 0) {
    berserkScore--;  
  } 
  if (invulnerableScore > 0) {
    invulnerableScore--;   
  }  
  if (enemy.name === "Mouse" && berserkScore === 0) {
  document.getElementById("berserkMouse").style.visibility='visible';   
  } 
  if (enemy.name === "Rat" && berserkScore === 0) {
  document.getElementById("berserkRat").style.visibility='visible';  
  }  
  if (enemy.name === "Dog" && berserkScore === 0) {
  document.getElementById("berserkDog").style.visibility='visible';  
  }  
  if (enemy.name === "Wolf" && berserkScore === 0) {
  document.getElementById("berserkWolf").style.visibility='visible';  
  }      
  if (enemy.name === "Goblin" && berserkScore === 0) {
  document.getElementById("berserkGoblin").style.visibility='visible';  
  }  
  if (enemy.name === "Orc" && berserkScore === 0) {
  document.getElementById("berserkOrc").style.visibility='visible';  
  }  
  if (enemy.name === "Ogre" && berserkScore === 0) {
  document.getElementById("berserkOgre").style.visibility='visible';  
  }    
  if (enemy.name === "Mouse" && invulnerableScore === 0) {
  document.getElementById("invulnerableMouse").style.visibility='visible';  
  } 
  if (enemy.name === "Rat" && invulnerableScore === 0) {
  document.getElementById("invulnerableRat").style.visibility='visible';  
  }  
  if (enemy.name === "Dog" && invulnerableScore === 0) {
  document.getElementById("invulnerableDog").style.visibility='visible';  
  }  
  if (enemy.name === "Wolf" && invulnerableScore === 0) {
  document.getElementById("invulnerableWolf").style.visibility='visible';  
  }      
  if (enemy.name === "Goblin" && invulnerableScore === 0) {
  document.getElementById("invulnerableGoblin").style.visibility='visible';  
  }  
  if (enemy.name === "Orc" && invulnerableScore === 0) {
  document.getElementById("invulnerableOrc").style.visibility='visible';  
  }  
  if (enemy.name === "Ogre" && invulnerableScore === 0) {
  document.getElementById("invulnerableOgre").style.visibility='visible';  
  } 
    if (enemy.hp < 1 && self.hp > 0) {
      self.xp += enemy.xpWin;
      fighting = false;
      enemy.defeats ++;
      enemyLevel();
      document.getElementById('close').style.visibility='visible'; 
      self.lowDrop(enemy.difficulty); // need to amend drop method to take table and difficulty
      fightResult.innerHTML = "You win! You receive " + enemy.xpWin + " Experience Points and " + drop + "." + space + "You have " + self.hp + " Hit Points left and " + self.xp + " Experience Points.";
      self.updateStatus();
      document.getElementById("attack" + enemy.name).style.visibility='hidden';
      berserkScore = 5;
      invulnerableScore = 4;  
    }
    else if (enemy.hp < 1 && self.hp < 1) {
      fightResult.innerHTML = "The dying " + enemy.name + " lashes out with the last of it's strength, you are both dead. You receive " + enemy.xpDraw + " Experience Points and pay 2 Energy for resurrection.";
      self.xp += enemy.xpDraw;
      fighting = false;
      document.getElementById('close').style.visibility='visible'; 
      self.updateStatus();
      document.getElementById("attack" + enemy.name).style.visibility='hidden';
      berserkScore = 5;
      invulnerableScore = 4;        
    }
    else if (self.hp < 1 && enemy.hp > 0) {
      fightResult.innerHTML = "You lose! You receive " + enemy.xpLose + " Experience Points and pay 2 Energy for resurrection.";
      self.xp += enemy.xpLose;
      fighting = false;
      document.getElementById('close').style.visibility='visible'; 
      self.updateStatus();
      document.getElementById("attack" + enemy.name).style.visibility='hidden';
      berserkScore = 5;
      invulnerableScore = 4;        
     }
  };
    berserk = function()  {
    $('.eye').css('background-color', 'red'); 
    var randomize = (Math.random(0,1) + 0.2);
    var score = Math.floor((self.luck/10)/randomize);
    var berserkModifier = 2 + Math.floor(0.46*((self.str + self.hit + self.luck) / 3)) 
    highRoll = Math.floor(enemy.level/3) + 4;
    scaler = Math.floor(enemy.level/5);
    enemyRoll = ranInt(1, highRoll);
    yourRoll = ranInt(1, highRoll) + score;
      if (((self.str + yourRoll + berserkModifier) - (enemy.def + enemyRoll)) > 0){
        if ((self.hit + yourRoll + berserkModifier) - (enemy.dodge + enemyRoll) > (2 + scaler)) {
          yourDamageThisRound = 2* ((self.str + yourRoll + berserkModifier) - (enemy.def + enemyRoll));         
        }
        else if ((self.hit + yourRoll + berserkModifier) - (enemy.dodge + enemyRoll) < 1) {
          yourDamageThisRound = 0;          
        }
        else {
          yourDamageThisRound = (self.str + yourRoll + berserkModifier) - (enemy.def + enemyRoll);         
        }
      }
      else {
        if ((self.hit + yourRoll + berserkModifier) - (enemy.dodge + enemyRoll) > (2 + scaler)) {
          yourDamageThisRound = 2 + scaler;         
        }
        else if ((self.hit + yourRoll + berserkModifier) - (enemy.dodge + enemyRoll) < 1) {
          yourDamageThisRound = 0;      
        }
        else {
          yourDamageThisRound = 1;          
        }
      }
  if (yourDamageThisRound>=10) {
    $('#hit').css('left', '510px');
  }
  else {
    $('#hit').css('left', '525px');  
  }    
  hit.innerHTML = yourDamageThisRound;   
  enemy.hp -= yourDamageThisRound; 
  enemyHP.innerHTML = enemy.name + " health: " + enemy.hp;
      if (((enemy.str + enemyRoll) - (self.def + yourRoll)) > 0 ){
        if ((enemy.hit + enemyRoll) - (self.dodge + yourRoll) > (2 + scaler)) {
          enemyDamageThisRound = 2* ((enemy.str + enemyRoll) - (self.def + yourRoll));          
        }
        else if ((enemy.hit + enemyRoll) - (self.dodge + yourRoll) < 1) {
          enemyDamageThisRound = 0;         
        }
        else {
          enemyDamageThisRound = (enemy.str + enemyRoll) - (self.def + yourRoll);         
        }
      }
      else {
        if ((enemy.hit + enemyRoll) - (self.dodge + yourRoll) > (2 + scaler)) {
          enemyDamageThisRound = (2 + scaler);         
        }
        else if ((enemy.hit + enemyRoll) - (self.dodge + yourRoll) < 1) {
          enemyDamageThisRound = 0;         
        }
        else {
          enemyDamageThisRound = 1;          
        } 
      }
  if (enemyDamageThisRound>=10) {
    $('#enemyhit').css('left', '410px');
  }
  else {
    $('#enemyhit').css('left', '425px');  
  }     
  enemyhit.innerHTML = enemyDamageThisRound;
  if (this.hp === this.maxHp && enemyDamageThisRound>0) {
        hpStartDate = new Date();
      }  
  self.hp -= enemyDamageThisRound;
  yourHP.innerHTML = "Your health: " + self.hp;
  berserkScore = 4;
  document.getElementById("berserk" + enemy.name).style.visibility='hidden';  
    if (enemy.hp < 1 && self.hp > 0) {
      self.xp += enemy.xpWin;
      fighting = false;
      enemy.defeats ++;
      enemyLevel();
      document.getElementById('close').style.visibility='visible'; 
      self.lowDrop(enemy.difficulty); // need to amend drop method to take table and difficulty
      fightResult.innerHTML = "You win! You receive " + enemy.xpWin + " Experience Points and " + drop + "." + space + "You have " + self.hp + " Hit Points left and " + self.xp + " Experience Points.";
      self.updateStatus();
      document.getElementById("attack" + enemy.name).style.visibility='hidden';
      berserkScore = 5;
      invulnerableScore = 4;        
    }
    else if (enemy.hp < 1 && self.hp < 1) {
      fightResult.innerHTML = "The dying " + enemy.name + " lashes out with the last of it's strength, you are both dead. You receive " + enemy.xpDraw + " Experience Points and pay 2 Energy for resurrection.";
      self.xp += enemy.xpDraw;
      fighting = false;
      document.getElementById('close').style.visibility='visible'; 
      self.updateStatus();
      document.getElementById("attack" + enemy.name).style.visibility='hidden';
      berserkScore = 5;
      invulnerableScore = 4;        
    }
    else if (self.hp < 1 && enemy.hp > 0) {
      fightResult.innerHTML = "You lose! You receive " + enemy.xpLose + " Experience Points and pay 2 Energy for resurrection.";
      self.xp += enemy.xpLose;
      fighting = false;
      document.getElementById('close').style.visibility='visible'; 
      self.updateStatus();
      document.getElementById("attack" + enemy.name).style.visibility='hidden';
      berserkScore = 5;
      invulnerableScore = 4;        
     }
  };
  
    
  invulnerable = function()  {
    $('#shield').css({'width': '150px', 'height': '150px'});  
    var randomize = (Math.random(0,1) + 0.2);
    var score = Math.floor((self.luck/10)/randomize); 
    highRoll = Math.floor(enemy.level/3) + 4;
    scaler = Math.floor(enemy.level/5);
    enemyRoll = ranInt(1, highRoll);
    yourRoll = ranInt(1, highRoll) + score;
      if (((self.str + yourRoll) - (enemy.def + enemyRoll)) > 0){
        if ((self.hit + yourRoll) - (enemy.dodge + enemyRoll) > (2 + scaler)) {
          yourDamageThisRound = 2* ((self.str + yourRoll) - (enemy.def + enemyRoll));         
        }
        else if ((self.hit + yourRoll) - (enemy.dodge + enemyRoll) < 1) {
          yourDamageThisRound = 0;          
        }
        else {
          yourDamageThisRound = (self.str + yourRoll) - (enemy.def + enemyRoll);         
        }
      }
      else {
        if ((self.hit + yourRoll) - (enemy.dodge + enemyRoll) > (2 + scaler)) {
          yourDamageThisRound = 2 + scaler;         
        }
        else if ((self.hit + yourRoll) - (enemy.dodge + enemyRoll) < 1) {
          yourDamageThisRound = 0;      
        }
        else {
          yourDamageThisRound = 1;          
        }
      } 
  if (yourDamageThisRound>=10) {
    $('#hit').css('left', '510px');
  }
  else {
    $('#hit').css('left', '525px');  
  }     
  hit.innerHTML = yourDamageThisRound;  
  enemy.hp -= yourDamageThisRound; 
  enemyHP.innerHTML = enemy.name + " health: " + enemy.hp;
  enemyDamageThisRound = 0; 
  enemyhit.innerHTML = enemyDamageThisRound;
  if (this.hp === this.maxHp && enemyDamageThisRound>0) {
        hpStartDate = new Date();
      }  
  self.hp -= enemyDamageThisRound;
  yourHP.innerHTML = "Your health: " + self.hp;
  invulnerableScore = 3;
  document.getElementById("invulnerable" + enemy.name).style.visibility='hidden';     
    if (enemy.hp < 1 && self.hp > 0) {
      self.xp += enemy.xpWin;
      fighting = false;
      enemy.defeats ++;
      enemyLevel();
      document.getElementById('close').style.visibility='visible'; 
      self.lowDrop(enemy.difficulty); // need to amend drop method to take table and difficulty
      fightResult.innerHTML = "You win! You receive " + enemy.xpWin + " Experience Points and " + drop + "." + space + "You have " + self.hp + " Hit Points left and " + self.xp + " Experience Points.";
      self.updateStatus();
      document.getElementById("attack" + enemy.name).style.visibility='hidden';
      berserkScore = 5;
      invulnerableScore = 4;        
    }    
  };     
  }
  }
}
function updateStatus() {
  this.updateTime();
  this.healthRegen();
  this.checkLevel();
  this.equipDef = this.chestDef + this.legDef + this.helmDef;
  this.equipDodge = this.shieldDodge + this.bootDodge;
  this.str = this.baseStr + this.equipStr;
  this.hit = this.baseHit + this.equipHit;
  this.def = this.baseDef + this.equipDef;
  this.dodge = this.baseDodge + this.equipDodge; 
  this.luck = this.baseLuck + this.equipLuck;
  this.maxHp = this.equipHp + this.baseMaxHp;
  if (this.hp <= 0) {
    this.hp = this.maxHp;
    if (this.energy > 1) {
      this.energy -= 2;
    }
    else {
      (this.energy = 0);
    }
  }
  if (this.energy === this.maxEnergy) {
    correction = 0;
  }
  if (this.hp === this.maxHp) {
    hpCorrection = 0;
  }
  display_level.innerHTML = "Your level is " + this.level + ".";
  display_strength.innerHTML = "You have " + this.str + " Strength.";
  display_hit.innerHTML = "You have " + this.hit + " Accuracy.";
  display_def.innerHTML = "You have " + this.def + " Defence.";
  display_dodge.innerHTML = "You have " + this.dodge + " Evade.";
  display_luck.innerHTML = "You have " + this.luck + " Luck.";
  display_points.innerHTML = "You have " + this.points + " Attribute Points to  spend.";
  display_HP.innerHTML = "Health: " + this.hp + "/" + this.maxHp;
  display_energy.innerHTML = "Energy: " + this.energy + "/" + this.maxEnergy;
  display_Xp.innerHTML = "Experience Points: " + this.xp;
  display_NextLevelAt.innerHTML = "Next level at: " + this.nextLevelXp;
  display_Gold.innerHTML = "Gold: " + this.gold;
  display_Equipment.innerHTML = "Equipment: " + this.equipment;
  display_Weapon.innerHTML = "Weapon: " + this.weapon;
  display_Chest.innerHTML = "Chest: " + this.chest;
  display_Shield.innerHTML = "Shield: " + this.shield;
  display_Legs.innerHTML = "Legs: " + this.legs;
  display_Helm.innerHTML = "Helm: " + this.helm;
  display_Gloves.innerHTML = "Gloves: " + this.gloves;
  display_Boots.innerHTML = "Boots: " + this.boots;
  display_Ring.innerHTML = "Ring: " + this.ring;
  display_Amulet.innerHTML = "Amulet: " + this.amulet; 
  document.getElementById("berserkMouse").style.visibility='hidden';
  document.getElementById("berserkRat").style.visibility='hidden';
  document.getElementById("berserkDog").style.visibility='hidden';
  document.getElementById("berserkWolf").style.visibility='hidden';
  document.getElementById("berserkGoblin").style.visibility='hidden';
  document.getElementById("berserkOrc").style.visibility='hidden';
  document.getElementById("berserkOgre").style.visibility='hidden';
  document.getElementById("invulnerableMouse").style.visibility='hidden';
  document.getElementById("invulnerableRat").style.visibility='hidden';
  document.getElementById("invulnerableDog").style.visibility='hidden';
  document.getElementById("invulnerableWolf").style.visibility='hidden';
  document.getElementById("invulnerableGoblin").style.visibility='hidden';
  document.getElementById("invulnerableOrc").style.visibility='hidden';
  document.getElementById("invulnerableOgre").style.visibility='hidden';    
}
function strPlus() {
  if (this.points > 0) {
    this.baseStr += 1;
    this.points -= 1;
    result.innerHTML = "Your Base Strength is increased to " + this.baseStr + ".";
    this.updateStatus();
  }
  else {
    result.innerHTML = "You don't have enough points, go and fight something.";
  }
}
function hitPlus() {
  if (this.points > 0) {
    this.baseHit += 1;
    this.points -= 1;
    result.innerHTML = "Your Base Accuracy is increased to " + this.baseHit + ".";
    this.updateStatus();
  }
  else {
    result.innerHTML = "You don't have enough points, go and fight something.";
  }
}
function defPlus() {
  if (this.points > 0) {
    this.baseDef += 1;
    this.points -= 1;
    result.innerHTML = "Your Base Defence is increased to " + this.baseDef + ".";
    this.updateStatus();
  }
  else {
    result.innerHTML = "You don't have enough points, go and fight something.";
  }
}
function dodgePlus() {
  if (this.points > 0) {
    this.baseDodge += 1;
    this.points -= 1;
    result.innerHTML = "Your Base Evade is increased to " + this.baseDodge + ".";
    this.updateStatus();
  }
  else {
    result.innerHTML = "You don't have enough points, go and fight something.";
  }
}
function luckPlus() {
  if (this.points > 0) {
    this.baseLuck += 1;
    this.points -= 1;
    result.innerHTML = "Your Base Luck is increased to " + this.baseLuck + ".";
    this.updateStatus();
  }
  else {
    result.innerHTML = "You don't have enough points, go and fight something.";
  }
}
function checkLevel() {
  if (this.xp >= this.nextLevelXp) {
  this.xp -= this.nextLevelXp;
  this.level ++;
  this.nextLevelXp = 10 + ((this.level-1)*(20 + this.level));
  this.baseMaxHp = this.baseMaxHp + 5;
  this.maxHp = this.equipHp + this.baseMaxHp;  
  if (this.hp < this.maxHp) {
    this.hp = this.maxHp;
  }
  this.points = this.points + 2;
  this.maxEnergy += 2;
  if (this.energy < this.maxEnergy) {
    this.energy = this.maxEnergy;
  }  
  this.gold += 10;
  correction = 0; 
  hpCorrection = 0;
  result.innerHTML = "Congratulations, you reach level " + this.level + " and claim 10 gold as a reward. <br/>You have " + this.points + " Attribute Points to spend and your Hit Points have increased to " + this.hp + ".<br/>You now have " + this.xp + " Experience Points. Next level at " + this.nextLevelXp + ".";
  this.updateStatus();  
    }
}
function lowDrop(difficulty) {
  var luckNerf = Math.floor(this.luck*0.75);
  var luckValue = 1;
  if (luckNerf<1) {
    luckValue = 1;
  }
  else {
    luckValue = luckNerf;
  }
  var dropRoll = luckValue + difficulty + ranInt(0, 9);
  switch(dropRoll) {
    case 2: drop = "1 gold coin";
        this.gold += 1;
        break;
    case 3: drop = "2 gold coin";
        this.gold += 2;
        break;
    case 4: drop = "a Crust of Bread";
        this.equipment[this.equipment.length] = " Bread";        
        break;
    case 5: drop = "3 gold coins";
        this.gold += 3;
        break; 
    case 6: drop = "a Crust of Bread and a gold coin";
        this.equipment[this.equipment.length] = " Bread";   
        this.gold += 1;     
        break;                  
    case 7: drop = "a Pair of Cloth Boots";
        this.equipment[this.equipment.length] = " Cloth Boots";
        break;      
    case 8: drop = "6 gold coins";
        this.gold += 6;        
        break; 
    case 9: drop = "7 gold coins";
        this.gold += 7;
        break;
    case 10: drop = "a Piece of Cheese";
        this.equipment[this.equipment.length] = " Cheese";        
        break;         
    case 11: drop = "a Wooden Shield";
        this.equipment[this.equipment.length] = " Wooden Shield";        
        break; 
    case 12: drop = "10 gold coins";
        this.gold += 10;
        break;           
    case 13: drop = "a Piece of Cheese and 2 gold coins";
        this.equipment[this.equipment.length] = " Cheese"; 
        this.gold += 2;    
        break;   
    case 14: drop = "11 gold coins";
        this.gold += 11;
        break;
    case 15: drop = "a Wooden Training Sword";
        this.equipment[this.equipment.length] = " Wooden Sword";
        break;
    case 16: drop = "a Piece of Cheese and 4 gold coins";
        this.equipment[this.equipment.length] = " Cheese"; 
        this.gold += 4;      
        break;         
    case 17: drop = "14 gold coins";
        this.gold += 14;
        break;
    case 18: drop = "a Cloth Shirt";
        this.equipment[this.equipment.length] = " Cloth Shirt";        
        break;    
    case 19: drop = "16 gold coins";
        this.gold += 16;
        break; 
    case 20: drop = "a Leather Hat";
        this.equipment[this.equipment.length] = " Leather Hat";        
        break; 
    case 21: drop = "17 gold coins";
        this.gold += 17;
        break;         
    case 22: drop = "a Pair of Leather Gloves";
        this.equipment[this.equipment.length] = " Leather Gloves";        
        break;      
    case 23: drop = "a Leg of Ham";
        this.equipment[this.equipment.length] = " Ham";        
        break;
    case 24: drop = "20 gold coins";
        this.gold += 20;
        break; 
    case 25: drop = "a Pair of Leather Leggings";
        this.equipment[this.equipment.length] = " Leather Legs";        
        break;              
    case 26: drop = "a Leg of Ham and 3 gold coins";
        this.gold += 3;      
        this.equipment[this.equipment.length] = " Ham";        
        break;
    case 27: drop = "22 gold coins";
        this.gold += 22;
        break;               
    case 28: drop = "a Bone Helm and 6 gold coins";
        this.equipment[this.equipment.length] = " Bone Helm";
        this.gold += 6;
        break;       
    case 29: drop = "25 gold coins";
        this.gold += 25;
        break; 
    case 30: drop = "a Bone Club";
        this.equipment[this.equipment.length] = " Bone Club";
        break;
    case 31: drop = "27 gold coins";
        this.gold += 27;
        break;
    case 32: drop = "a Leg of Ham and 9 gold coins";
        this.gold += 9;      
        this.equipment[this.equipment.length] = " Ham";        
        break;                
    case 33: drop = "a Bone Chestplate";
        this.equipment[this.equipment.length] = " Bone Chestplate";        
        break;
    case 34: drop = "30 gold coins";
        this.gold += 30;
        break; 
    case 35: drop = "a Pair of Studded Gloves";
        this.equipment[this.equipment.length] = " Studded Gloves";
        break; 
    case 36: drop = "34 gold coins";
        this.gold += 34;
        break; 
    case 37: drop = "a Kite Shield";
        this.equipment[this.equipment.length] = " Kite Shield";        
        break; 
    case 38: drop = "two Legs of Ham";
        this.equipment[this.equipment.length] = " Ham";     
        this.equipment[this.equipment.length] = " Ham";        
        break;              
    case 39: drop = "36 gold coins";
        this.gold += 36;
        break; 
    case 40: drop = "a Pair of Studded Leggings";
        this.equipment[this.equipment.length] = " Studded Legs";
        break;     
    case 41: drop = "38 gold coins";   
        this.gold += 38;
        break; 
    case 42: drop = "40 gold coins";   
        this.gold += 40;
        break;         
    case 43: drop = "a Pair of Bronze Gloves";
        this.equipment[this.equipment.length] = " Bronze Gloves";
        break;            
    default: drop = "45 gold coins";   
        this.gold += 45;
        break;      
  }
}

function updateTime() {
  if (this.energy < this.maxEnergy) {
  var updatedDate = new Date();
  currentDate = updatedDate.getTime();
  var startNum = startDate.getTime(); 
  var difference = currentDate - startNum - (correction*60000);
  if (difference >= 60000) {
  var minutes = difference/60000;
    if (this.energy + (Math.floor(minutes)) >= this.maxEnergy) {
      this.energy = this.maxEnergy;
    }
    else {
      this.energy += Math.floor(minutes);
      correction += Math.floor(minutes);
    }   
   }
  }
}
function healthRegen() {
  if (this.hp < this.maxHp) {
  var updatedDate = new Date();
  currentDate = updatedDate.getTime();
  var startNum = hpStartDate.getTime(); 
  var difference = currentDate - startNum - (hpCorrection*60000);
  if (difference >= 60000) {
  var minutes = difference/60000;
    if (this.hp + (Math.floor(minutes)) >= this.maxHp) {
      this.hp = this.maxHp;
    }
    else {
      this.hp += Math.floor(minutes);
      hpCorrection += Math.floor(minutes);
    }   
   }
  }
}
function find() {
  equipment.innerHTML = "";
  this.select();  
  document.getElementById("sellItems").style.visibility='visible';
  document.getElementById("useItems").style.visibility='visible';
}
function sell() {
  var item = document.getElementById("equipment").value;
  var id_tag = item,
  position = this.equipment.indexOf(id_tag);
  if ( ~position ) this.equipment.splice(position, 1);
  switch(item) {
    case " Bread": this.gold += 3;
    break;
    case " Stick": this.gold += 5;
    break;
    case " Swimming Trunks": this.gold += 5;
    break;
    case " Sandals": this.gold += 5;
    break;
    case " Cheese": this.gold += 5;
    break;
    case " Cloth Shirt": this.gold += 13;
    break;
    case " Cloth Legs": this.gold += 13;
    break;
    case " Cloth Hat": this.gold += 7;
    break;
    case " Cloth Gloves": this.gold += 11;
    break;
    case " Cloth Boots": this.gold += 7;
    break;    
    case " Wooden Sword": this.gold += 11;
    break;
    case " Wooden Shield": this.gold += 11;
    break;
    case " Worn Ring": this.gold += 14;
    break;
    case " Tarnished Ring": this.gold += 19;
    break;
    case " Shiny Ring": this.gold += 31;
    break;
    case " Worn Amulet": this.gold += 15;
    break;
    case " Tarnished Amulet": this.gold += 19;
    break;
    case " Shiny Amulet": this.gold += 31;
    break;
    case " Ham": this.gold += 10;
    break;     
    case " Leather Shirt": this.gold += 31;
    break;
    case " Leather Legs": this.gold += 27;
    break;
    case " Leather Hat": this.gold += 13;
    break;
    case " Leather Gloves": this.gold += 23;
    break;
    case " Leather Boots": this.gold += 13;
    break;    
    case " Truncheon": this.gold += 23;
    break;
    case " Hardwood Shield": this.gold += 25;
    break;
    case " Bone Chestplate": this.gold += 47;
    break;
    case " Hard Leather Legs": this.gold += 43;
    break;
    case " Bone Helm": this.gold += 23;
    break;
    case " Hard Leather Mitts": this.gold += 37;
    break;
    case " Hard Leather Boots": this.gold += 21;
    break;    
    case " Bone Club": this.gold += 37;
    break;
    case " Reinforced Shield": this.gold += 39;
    break;    
    case " Hatchet": this.gold += 43;
    break;    
    case " Kite Shield": this.gold += 45;
    break;
    case " Tin Helm": this.gold += 27;
    break;
    case " Studded Harness": this.gold += 55;
    break;
    case " Studded Legs": this.gold += 53;
    break;
    case " Studded Gloves": this.gold += 45;
    break;
    case " Hobnail Boots": this.gold += 25;
    break;
    case " Engraved Ring": this.gold += 37;
    break;    
    case " Engraved Amulet": this.gold += 39;
    break;
    case " Stew": this.gold += 15;
    break; 
    case " Bronze Dagger": this.gold += 59;
    break;    
    case " Bronze Shield": this.gold += 61;
    break;
    case " Bronze Helm": this.gold += 35;
    break;
    case " Bronze Chainmail": this.gold += 73;
    break;
    case " Bronze Chainlegs": this.gold += 71;
    break;
    case " Bronze Gloves": this.gold += 59;
    break;
    case " Bronze Boots": this.gold += 33;
    break;
    case " Jade Ring": this.gold += 49;
    break;    
    case " Jade Amulet": this.gold += 51;
    break;
    }
    document.getElementById("sellItems").style.visibility='hidden';
    document.getElementById("useItems").style.visibility='hidden';
    this.updateStatus();
}
function use() {
  var item = document.getElementById("equipment").value;
  var id_tag = item,
  position = this.equipment.indexOf(id_tag);
  if ( ~position ) this.equipment.splice(position, 1);
    switch(item) {
    case " Bread": this.hp += 3;
      this.energy +=1;
      break;
    case " Cheese": this.hp += 5;
      this.energy +=2;
      break; 
    case " Ham": this.hp += 8;
      this.energy +=3;
      break;  
    case " Stew": this.hp += 9;
      this.energy +=5;
      break;     
    case " Stick": if(this.weapon !== "None") {
      this.equipment[this.equipment.length] = this.weapon;
    }
      this.weapon = " Stick";
      this.equipStr = 1;   
      break;
    case " Swimming Trunks": if(this.legs !== "None") {
      this.equipment[this.equipment.length] = this.legs;
    }
      this.legs = " Swimming Trunks"; 
      this.legDef = 1;   
      break; 
    case " Sandals": if(this.boots !== "None") {
      this.equipment[this.equipment.length] = this.boots;
    }
      this.boots = " Sandals"; 
      this.bootDodge = 1;  
      break; 
    case " Wooden Sword": if(this.weapon !== "None") {
      this.equipment[this.equipment.length] = this.weapon;
    }
      this.weapon = " Wooden Sword"; 
      this.equipStr = 4;  
      break;
    case " Wooden Shield": if(this.shield !== "None") {
      this.equipment[this.equipment.length] = this.shield;
    }
      this.shield = " Wooden Shield"; 
      this.shieldDodge = 4;  
      break;   
    case " Cloth Shirt": if(this.chest !== "None") {
      this.equipment[this.equipment.length] = this.chest;
    }
      this.chest = " Cloth Shirt"; 
      this.chestDef = 4;   
      break;
    case " Cloth Legs": if(this.legs !== "None") {
      this.equipment[this.equipment.length] = this.legs;
    }
      this.legs = " Cloth Legs"; 
      this.legDef = 4;   
      break;   
    case " Cloth Hat": if(this.helm !== "None") {
      this.equipment[this.equipment.length] = this.helm;
    }
      this.helm = " Cloth Hat"; 
      this.helmDef = 2;  
      break;  
    case " Cloth Boots": if(this.boots !== "None") {
      this.equipment[this.equipment.length] = this.boots;
    }
      this.boots = " Cloth Boots"; 
      this.bootDodge = 2;  
      break; 
    case " Cloth Gloves": if(this.gloves !== "None") {
      this.equipment[this.equipment.length] = this.gloves;
    }
      this.gloves = " Cloth Gloves"; 
      this.equipHit = 4;  
      break; 
    case " Worn Ring": if(this.ring !== "None") {
      this.equipment[this.equipment.length] = this.ring;
    }
      this.ring = " Worn Ring"; 
      this.equipLuck = 2;  
      break;   
    case " Worn Amulet": if(this.amulet !== "None") {
      this.equipment[this.equipment.length] = this.amulet;
    }
      this.amulet = " Worn Amulet"; 
      this.equipHp = 10;  
      break;       
    case " Truncheon": if(this.weapon !== "None") {
      this.equipment[this.equipment.length] = this.weapon;
    }
      this.weapon = " Truncheon"; 
      this.equipStr = 8;  
      break;
    case " Hardwood Shield": if(this.shield !== "None") {
      this.equipment[this.equipment.length] = this.shield;
    }
      this.shield = " Hardwood Shield"; 
      this.shieldDodge = 8;  
      break;   
    case " Leather Shirt": if(this.chest !== "None") {
      this.equipment[this.equipment.length] = this.chest;
    }
      this.chest = " Leather Shirt"; 
      this.chestDef = 8;   
      break;
    case " Leather Legs": if(this.legs !== "None") {
      this.equipment[this.equipment.length] = this.legs;
    }
      this.legs = " Leather Legs"; 
      this.legDef = 8;   
      break;   
    case " Leather Hat": if(this.helm !== "None") {
      this.equipment[this.equipment.length] = this.helm;
    }
      this.helm = " Leather Hat"; 
      this.helmDef = 4;  
      break;  
    case " Leather Boots": if(this.boots !== "None") {
      this.equipment[this.equipment.length] = this.boots;
    }
      this.boots = " Leather Boots"; 
      this.bootDodge = 4;  
      break; 
    case " Leather Gloves": if(this.gloves !== "None") {
      this.equipment[this.equipment.length] = this.gloves;
    }
      this.gloves = " Leather Gloves"; 
      this.equipHit = 8;  
      break; 
    case " Tarnished Ring": if(this.ring !== "None") {
      this.equipment[this.equipment.length] = this.ring;
    }
      this.ring = " Tarnished Ring"; 
      this.equipLuck = 4;  
      break;
    case " Tarnished Amulet": if(this.amulet !== "None") {
      this.equipment[this.equipment.length] = this.amulet;
    }
      this.amulet = " Tarnished Amulet"; 
      this.equipHp = 20;  
      break;       
    case " Bone Club": if(this.weapon !== "None") {
      this.equipment[this.equipment.length] = this.weapon;
    }
      this.weapon = " Bone Club"; 
      this.equipStr = 12;  
      break;
    case " Reinforced Shield": if(this.shield !== "None") {
      this.equipment[this.equipment.length] = this.shield;
    }
      this.shield = " Reinforced Shield"; 
      this.shieldDodge = 12;  
      break;   
    case " Bone Chestplate": if(this.chest !== "None") {
      this.equipment[this.equipment.length] = this.chest;
    }
      this.chest = " Bone Chestplate"; 
      this.chestDef = 12;   
      break;
    case " Hard Leather Legs": if(this.legs !== "None") {
      this.equipment[this.equipment.length] = this.legs;
    }
      this.legs = " Hard Leather Legs"; 
      this.legDef = 12;   
      break;   
    case " Bone Helm": if(this.helm !== "None") {
      this.equipment[this.equipment.length] = this.helm;
    }
      this.helm = " Bone Helm"; 
      this.helmDef = 6;  
      break;  
    case " Hard Leather Boots": if(this.boots !== "None") {
      this.equipment[this.equipment.length] = this.boots;
    }
      this.boots = " Hard Leather Boots"; 
      this.bootDodge = 6;  
      break; 
    case " Hard Leather Mitts": if(this.gloves !== "None") {
      this.equipment[this.equipment.length] = this.gloves;
    }
      this.gloves = " Hard Leather Mitts"; 
      this.equipHit = 12;  
      break; 
    case " Shiny Ring": if(this.ring !== "None") {
      this.equipment[this.equipment.length] = this.ring;
    }
      this.ring = " Shiny Ring"; 
      this.equipLuck = 6;  
      break; 
    case " Shiny Amulet": if(this.amulet !== "None") {
      this.equipment[this.equipment.length] = this.amulet;
    }
      this.amulet = " Shiny Amulet"; 
      this.equipHp = 30;  
      break;   
    case " Hatchet": if(this.weapon !== "None") {
      this.equipment[this.equipment.length] = this.weapon;
    }
      this.weapon = " Hatchet"; 
      this.equipStr = 16;  
      break;
    case " Kite Shield": if(this.shield !== "None") {
      this.equipment[this.equipment.length] = this.shield;
    }
      this.shield = " Kite Shield"; 
      this.shieldDodge = 16;  
      break;   
    case " Studded Harness": if(this.chest !== "None") {
      this.equipment[this.equipment.length] = this.chest;
    }
      this.chest = " Studded Harness"; 
      this.chestDef = 16;   
      break;
    case " Studded Legs": if(this.legs !== "None") {
      this.equipment[this.equipment.length] = this.legs;
    }
      this.legs = " Studded Legs"; 
      this.legDef = 16;   
      break;   
    case " Tin Helm": if(this.helm !== "None") {
      this.equipment[this.equipment.length] = this.helm;
    }
      this.helm = " Tin Helm"; 
      this.helmDef = 8;  
      break;  
    case " Hobnail Boots": if(this.boots !== "None") {
      this.equipment[this.equipment.length] = this.boots;
    }
      this.boots = " Hobnail Boots"; 
      this.bootDodge = 8;  
      break; 
    case " Studded Gloves": if(this.gloves !== "None") {
      this.equipment[this.equipment.length] = this.gloves;
    }
      this.gloves = " Studded Gloves"; 
      this.equipHit = 16;  
      break; 
    case " Engraved Ring": if(this.ring !== "None") {
      this.equipment[this.equipment.length] = this.ring;
    }
      this.ring = " Engraved Ring"; 
      this.equipLuck = 8;  
      break; 
    case " Engraved Amulet": if(this.amulet !== "None") {
      this.equipment[this.equipment.length] = this.amulet;
    }
      this.amulet = " Engraved Amulet"; 
      this.equipHp = 40;  
      break;     
    case " Bronze Dagger": if(this.weapon !== "None") {
      this.equipment[this.equipment.length] = this.weapon;
    }
      this.weapon = " Bronze Dagger"; 
      this.equipStr = 20;  
      break;
    case " Bronze Shield": if(this.shield !== "None") {
      this.equipment[this.equipment.length] = this.shield;
    }
      this.shield = " Bronze Shield"; 
      this.shieldDodge = 20;  
      break;   
    case " Bronze Chainmail": if(this.chest !== "None") {
      this.equipment[this.equipment.length] = this.chest;
    }
      this.chest = " Bronze Chainmail"; 
      this.chestDef = 20;   
      break;
    case " Bronze Chainlegs": if(this.legs !== "None") {
      this.equipment[this.equipment.length] = this.legs;
    }
      this.legs = " Bronze Chainlegs"; 
      this.legDef = 20;   
      break;   
    case " Bronze Helm": if(this.helm !== "None") {
      this.equipment[this.equipment.length] = this.helm;
    }
      this.helm = " Bronze Helm"; 
      this.helmDef = 10;  
      break;  
    case " Bronze Boots": if(this.boots !== "None") {
      this.equipment[this.equipment.length] = this.boots;
    }
      this.boots = " Bronze Boots"; 
      this.bootDodge = 10;  
      break; 
    case " Bronze Gloves": if(this.gloves !== "None") {
      this.equipment[this.equipment.length] = this.gloves;
    }
      this.gloves = " Bronze Gloves"; 
      this.equipHit = 20;  
      break; 
    case " Jade Ring": if(this.ring !== "None") {
      this.equipment[this.equipment.length] = this.ring;
    }
      this.ring = " Jade Ring"; 
      this.equipLuck = 10;  
      break; 
    case " Jade Amulet": if(this.amulet !== "None") {
      this.equipment[this.equipment.length] = this.amulet;
    }
      this.amulet = " Jade Amulet"; 
      this.equipHp = 50;  
      break;        
    }      
    this.updateStatus (); 
    document.getElementById("sellItems").style.visibility='hidden';
    document.getElementById("useItems").style.visibility='hidden';
}
function select() {
  var sel = document.getElementById("equipment");
  for (var i=0; i< this.equipment.length; i++) {
    var opt = document.createElement("option");
    opt.innerHTML = this.equipment[i];
    opt.value = this.equipment[i];
    sel.appendChild(opt);
  }
}
function selectTier() {
  var sel = document.getElementById("shop_Tier");
  for (var i=0; i< tier.length; i++) {
    var opt = document.createElement("option");
    opt.innerHTML = tier[i];
    opt.value = tier[i];
    sel.appendChild(opt);
  }
}
function findTier() {
  shop_Tier.innerHTML = "";
  this.selectTier();  
  document.getElementById("shop_Tier").style.visibility='visible'; 
  document.getElementById("newStock").style.visibility='visible';  
}
function selectShop() {
  var sel = document.getElementById("shopStock");
  for (var i=0; i< shop.length; i++) {
    var opt = document.createElement("option");
    opt.innerHTML = shop[i];
    opt.value = shop[i];
    sel.appendChild(opt);
  }
}
function findShop() {
  shopStock.innerHTML = "";
  this.selectShop();  
  document.getElementById("buy").style.visibility='visible';  
}
function changeStock() {
  var shopTier = document.getElementById("shop_Tier").value;
  var stockTable = document.getElementById('stock');
  document.getElementById("findItem").style.visibility='visible';
  document.getElementById("shopStock").style.visibility='visible'; 
  if (shopTier==="1") {
    shop = [" Wooden Sword", " Wooden Shield", " Cloth Hat", " Cloth Shirt", " Cloth Legs", " Cloth Gloves", " Cloth Boots", " Worn Ring", " Worn Amulet"];
    stockTable.rows[1].cells[0].innerHTML = 'Wooden Sword'; 
    stockTable.rows[1].cells[1].innerHTML = 'Strength +4'; 
    stockTable.rows[1].cells[2].innerHTML = '42 gold'; 
    stockTable.rows[2].cells[0].innerHTML = 'Wooden Shield';
    stockTable.rows[2].cells[1].innerHTML = 'Evade +4';        
    stockTable.rows[2].cells[2].innerHTML = '45 gold';        
    stockTable.rows[3].cells[0].innerHTML = 'Cloth Hat';        
    stockTable.rows[3].cells[1].innerHTML = 'Defence +2';        
    stockTable.rows[3].cells[2].innerHTML = '24 gold';        
    stockTable.rows[4].cells[0].innerHTML = 'Cloth Shirt';  
    stockTable.rows[4].cells[1].innerHTML = 'Defence +4';    
    stockTable.rows[4].cells[2].innerHTML = '54 gold';    
    stockTable.rows[5].cells[0].innerHTML = 'Cloth Legs'; 
    stockTable.rows[5].cells[1].innerHTML = 'Defence +4';    
    stockTable.rows[5].cells[2].innerHTML = '48 gold'; 
    stockTable.rows[6].cells[0].innerHTML = 'Cloth Gloves';  
    stockTable.rows[6].cells[1].innerHTML = 'Accuracy +4';    
    stockTable.rows[6].cells[2].innerHTML = '45 gold';    
    stockTable.rows[7].cells[0].innerHTML = 'Cloth Boots'; 
    stockTable.rows[7].cells[1].innerHTML = 'Evade +2';    
    stockTable.rows[7].cells[2].innerHTML = '24 gold';
    stockTable.rows[8].cells[0].innerHTML = 'Worn Ring'; 
    stockTable.rows[8].cells[1].innerHTML = 'Luck +2';    
    stockTable.rows[8].cells[2].innerHTML = '36 gold'; 
    stockTable.rows[9].cells[0].innerHTML = 'Worn Amulet'; 
    stockTable.rows[9].cells[1].innerHTML = 'Max Health +10';    
    stockTable.rows[9].cells[2].innerHTML = '39 gold';    
  }
  else if (shopTier ==="2") { 
    shop = [" Truncheon", " Hardwood Shield", " Leather Hat", " Leather Shirt", " Leather Legs", " Leather Gloves", " Leather Boots", " Tarnished Ring", " Tarnished Amulet"];
    stockTable.rows[1].cells[0].innerHTML = 'Truncheon'; 
    stockTable.rows[1].cells[1].innerHTML = 'Strength +8'; 
    stockTable.rows[1].cells[2].innerHTML = '90 gold'; 
    stockTable.rows[2].cells[0].innerHTML = 'Hardwood Shield';
    stockTable.rows[2].cells[1].innerHTML = 'Evade +8';        
    stockTable.rows[2].cells[2].innerHTML = '96 gold';        
    stockTable.rows[3].cells[0].innerHTML = 'Leather Hat';        
    stockTable.rows[3].cells[1].innerHTML = 'Defence +4';        
    stockTable.rows[3].cells[2].innerHTML = '57 gold';        
    stockTable.rows[4].cells[0].innerHTML = 'Leather Shirt';  
    stockTable.rows[4].cells[1].innerHTML = 'Defence +8';    
    stockTable.rows[4].cells[2].innerHTML = '114 gold';    
    stockTable.rows[5].cells[0].innerHTML = 'Leather Legs'; 
    stockTable.rows[5].cells[1].innerHTML = 'Defence +8';    
    stockTable.rows[5].cells[2].innerHTML = '105 gold'; 
    stockTable.rows[6].cells[0].innerHTML = 'Leather Gloves';  
    stockTable.rows[6].cells[1].innerHTML = 'Accuracy +8';    
    stockTable.rows[6].cells[2].innerHTML = '90 gold';    
    stockTable.rows[7].cells[0].innerHTML = 'Leather Boots'; 
    stockTable.rows[7].cells[1].innerHTML = 'Evade +4';    
    stockTable.rows[7].cells[2].innerHTML = '51 gold'; 
    stockTable.rows[8].cells[0].innerHTML = 'Tarnished Ring'; 
    stockTable.rows[8].cells[1].innerHTML = 'Luck +4';    
    stockTable.rows[8].cells[2].innerHTML = '75 gold'; 
    stockTable.rows[9].cells[0].innerHTML = 'Tarnished Amulet'; 
    stockTable.rows[9].cells[1].innerHTML = 'Max Health +20';    
    stockTable.rows[9].cells[2].innerHTML = '78 gold';      
  }
  else if (shopTier ==="3") { 
    shop = [" Bone Club", " Reinforced Shield", " Bone Helm", " Bone Chestplate", " Hard Leather Legs", " Hard Leather Mitts", " Hard Leather Boots", " Shiny Ring", " Shiny Amulet"];
    stockTable.rows[1].cells[0].innerHTML = 'Bone Club'; 
    stockTable.rows[1].cells[1].innerHTML = 'Strength +12'; 
    stockTable.rows[1].cells[2].innerHTML = '150 gold'; 
    stockTable.rows[2].cells[0].innerHTML = 'Reinforced Shield';
    stockTable.rows[2].cells[1].innerHTML = 'Evade +12';        
    stockTable.rows[2].cells[2].innerHTML = '156 gold';        
    stockTable.rows[3].cells[0].innerHTML = 'Bone Helm';        
    stockTable.rows[3].cells[1].innerHTML = 'Defence +6';        
    stockTable.rows[3].cells[2].innerHTML = '93 gold';        
    stockTable.rows[4].cells[0].innerHTML = 'Bone Chestplate';  
    stockTable.rows[4].cells[1].innerHTML = 'Defence +18';    
    stockTable.rows[4].cells[2].innerHTML = '186 gold';    
    stockTable.rows[5].cells[0].innerHTML = 'Hard Leather Legs'; 
    stockTable.rows[5].cells[1].innerHTML = 'Defence +12';    
    stockTable.rows[5].cells[2].innerHTML = '171 gold'; 
    stockTable.rows[6].cells[0].innerHTML = 'Hard Leather Mitts';  
    stockTable.rows[6].cells[1].innerHTML = 'Accuracy +12';    
    stockTable.rows[6].cells[2].innerHTML = '150 gold';    
    stockTable.rows[7].cells[0].innerHTML = 'Hard Leather Boots'; 
    stockTable.rows[7].cells[1].innerHTML = 'Evade +6';    
    stockTable.rows[7].cells[2].innerHTML = '84 gold';
    stockTable.rows[8].cells[0].innerHTML = 'Shiny Ring'; 
    stockTable.rows[8].cells[1].innerHTML = 'Luck +6';    
    stockTable.rows[8].cells[2].innerHTML = '126 gold'; 
    stockTable.rows[9].cells[0].innerHTML = 'Shiny Amulet'; 
    stockTable.rows[9].cells[1].innerHTML = 'Max Health +30';    
    stockTable.rows[9].cells[2].innerHTML = '132 gold';    
  }
  else if (shopTier ==="4") { 
    shop = [" Hatchet", " Kite Shield", " Tin Helm", " Studded Harness", " Studded Legs", " Studded Gloves", " Hobnail Boots", " Engraved Ring", " Engraved Amulet"];
    stockTable.rows[1].cells[0].innerHTML = 'Hatchet'; 
    stockTable.rows[1].cells[1].innerHTML = 'Strength +16'; 
    stockTable.rows[1].cells[2].innerHTML = '216 gold'; 
    stockTable.rows[2].cells[0].innerHTML = 'Kite Shield';
    stockTable.rows[2].cells[1].innerHTML = 'Evade +16';        
    stockTable.rows[2].cells[2].innerHTML = '225 gold';        
    stockTable.rows[3].cells[0].innerHTML = 'Tin Helm';        
    stockTable.rows[3].cells[1].innerHTML = 'Defence +8';        
    stockTable.rows[3].cells[2].innerHTML = '129 gold';        
    stockTable.rows[4].cells[0].innerHTML = 'Studded Harness';  
    stockTable.rows[4].cells[1].innerHTML = 'Defence +16';    
    stockTable.rows[4].cells[2].innerHTML = '264 gold';    
    stockTable.rows[5].cells[0].innerHTML = 'Studded Legs'; 
    stockTable.rows[5].cells[1].innerHTML = 'Defence +16';    
    stockTable.rows[5].cells[2].innerHTML = '252 gold'; 
    stockTable.rows[6].cells[0].innerHTML = 'Studded Gloves';  
    stockTable.rows[6].cells[1].innerHTML = 'Accuracy +16';    
    stockTable.rows[6].cells[2].innerHTML = '216 gold';    
    stockTable.rows[7].cells[0].innerHTML = 'Hobnail Boots'; 
    stockTable.rows[7].cells[1].innerHTML = 'Evade +8';    
    stockTable.rows[7].cells[2].innerHTML = '123 gold';
    stockTable.rows[8].cells[0].innerHTML = 'Engraved Ring'; 
    stockTable.rows[8].cells[1].innerHTML = 'Luck +8';    
    stockTable.rows[8].cells[2].innerHTML = '180 gold';
    stockTable.rows[9].cells[0].innerHTML = 'Engraved Amulet'; 
    stockTable.rows[9].cells[1].innerHTML = 'Max Health +40';    
    stockTable.rows[9].cells[2].innerHTML = '192 gold';     
  }
  else if (shopTier ==="5") { 
    shop = [" Bronze Dagger", " Bronze Shield", " Bronze Helm", " Bronze Chainmail", " Bronze Chainlegs", " Bronze Gloves", " Bronze Boots", " Jade Ring", " Jade Amulet"];
    stockTable.rows[1].cells[0].innerHTML = 'Bronze Dagger'; 
    stockTable.rows[1].cells[1].innerHTML = 'Strength +20'; 
    stockTable.rows[1].cells[2].innerHTML = '291 gold'; 
    stockTable.rows[2].cells[0].innerHTML = 'Bronze Shield';
    stockTable.rows[2].cells[1].innerHTML = 'Evade +20';        
    stockTable.rows[2].cells[2].innerHTML = '300 gold';        
    stockTable.rows[3].cells[0].innerHTML = 'Bronze Helm';        
    stockTable.rows[3].cells[1].innerHTML = 'Defence +10';        
    stockTable.rows[3].cells[2].innerHTML = '165 gold';        
    stockTable.rows[4].cells[0].innerHTML = 'Bronze Chainmail';  
    stockTable.rows[4].cells[1].innerHTML = 'Defence +20';    
    stockTable.rows[4].cells[2].innerHTML = '336 gold';    
    stockTable.rows[5].cells[0].innerHTML = 'Bronze Chainlegs'; 
    stockTable.rows[5].cells[1].innerHTML = 'Defence +20';    
    stockTable.rows[5].cells[2].innerHTML = '324 gold'; 
    stockTable.rows[6].cells[0].innerHTML = 'Bronze Gloves';  
    stockTable.rows[6].cells[1].innerHTML = 'Accuracy +20';    
    stockTable.rows[6].cells[2].innerHTML = '291 gold';    
    stockTable.rows[7].cells[0].innerHTML = 'Bronze Boots'; 
    stockTable.rows[7].cells[1].innerHTML = 'Evade +10';    
    stockTable.rows[7].cells[2].innerHTML = '159 gold';
    stockTable.rows[8].cells[0].innerHTML = 'Jade Ring'; 
    stockTable.rows[8].cells[1].innerHTML = 'Luck +10';    
    stockTable.rows[8].cells[2].innerHTML = '225 gold';
    stockTable.rows[9].cells[0].innerHTML = 'Jade Amulet'; 
    stockTable.rows[9].cells[1].innerHTML = 'Max Health +50';    
    stockTable.rows[9].cells[2].innerHTML = '240 gold';     
  }  
  else if (shopTier ==="Food") {
    shop = [" Bread", " Cheese", " Ham", " Stew"];
    stockTable.rows[1].cells[0].innerHTML = 'Crust of Bread'; 
    stockTable.rows[1].cells[1].innerHTML = 'Health +3, Energy +1';    
    stockTable.rows[1].cells[2].innerHTML = '12 gold';     
    stockTable.rows[2].cells[0].innerHTML = 'Piece of Cheese'; 
    stockTable.rows[2].cells[1].innerHTML = 'Health +5, Energy +2';    
    stockTable.rows[2].cells[2].innerHTML = '22 gold';     
    stockTable.rows[3].cells[0].innerHTML = 'Leg of Ham'; 
    stockTable.rows[3].cells[1].innerHTML = 'Health +8, Energy +3';    
    stockTable.rows[3].cells[2].innerHTML = '34 gold';     
    stockTable.rows[4].cells[0].innerHTML = 'Hot Stew'; 
    stockTable.rows[4].cells[1].innerHTML = 'Health +9, Energy +5';    
    stockTable.rows[4].cells[2].innerHTML = '50 gold'; 
    stockTable.rows[5].cells[0].innerHTML = ''; 
    stockTable.rows[5].cells[1].innerHTML = '';    
    stockTable.rows[5].cells[2].innerHTML = '';    
    stockTable.rows[6].cells[0].innerHTML = ''; 
    stockTable.rows[6].cells[1].innerHTML = '';    
    stockTable.rows[6].cells[2].innerHTML = '';    
    stockTable.rows[7].cells[0].innerHTML = ''; 
    stockTable.rows[7].cells[1].innerHTML = '';    
    stockTable.rows[7].cells[2].innerHTML = '';    
    stockTable.rows[8].cells[0].innerHTML = ''; 
    stockTable.rows[8].cells[1].innerHTML = '';    
    stockTable.rows[8].cells[2].innerHTML = '';      
    stockTable.rows[9].cells[0].innerHTML = ''; 
    stockTable.rows[9].cells[1].innerHTML = '';    
    stockTable.rows[9].cells[2].innerHTML = '';         
  }
  document.getElementById("shop_Tier").style.visibility='hidden';
  document.getElementById("newStock").style.visibility='hidden';
}
function buy() {
  var item = document.getElementById("shopStock").value;
  switch(item) {   
      case " Wooden Sword": if (this.gold >= 42) {
        this.gold -= 42;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Wooden Shield": if (this.gold >= 45) {
        this.gold -= 45;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Cloth Hat": if (this.gold >= 24) {
        this.gold -= 24;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Cloth Shirt": if (this.gold >= 54) {
        this.gold -= 54;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Cloth Legs": if (this.gold >= 48) {
        this.gold -= 48;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Cloth Gloves": if (this.gold >= 45) {
        this.gold -= 45;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Cloth Boots": if (this.gold >= 24) {
        this.gold -= 24;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Worn Ring": if (this.gold >= 36) {
        this.gold -= 36;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Worn Amulet": if (this.gold >= 39) {
        this.gold -= 39;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bread": if (this.gold >= 12) {
        this.gold -= 12;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;      
      case " Truncheon": if (this.gold >= 90) {
        this.gold -= 90;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Hardwood Shield": if (this.gold >= 96) {
        this.gold -= 96;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Leather Hat": if (this.gold >= 57) {
        this.gold -= 57;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Leather Shirt": if (this.gold >= 114) {
        this.gold -= 114;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Leather Legs": if (this.gold >= 105) {
        this.gold -= 105;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Leather Gloves": if (this.gold >= 90) {
        this.gold -= 90;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Leather Boots": if (this.gold >= 51) {
        this.gold -= 51;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Tarnished Ring": if (this.gold >= 75) {
        this.gold -= 75;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break; 
      case " Tarnished Amulet": if (this.gold >= 78) {
        this.gold -= 78;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;      
      case " Cheese": if (this.gold >= 22) {
        this.gold -= 22;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;      
      case " Bone Club": if (this.gold >= 150) {
        this.gold -= 150;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Reinforced Shield": if (this.gold >= 156) {
        this.gold -= 156;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bone Helm": if (this.gold >= 93) {
        this.gold -= 93;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bone Chestplate": if (this.gold >= 186) {
        this.gold -= 186;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Hard Leather Legs": if (this.gold >= 171) {
        this.gold -= 171;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Hard Leather Mitts": if (this.gold >= 150) {
        this.gold -= 150;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Hard Leather Boots": if (this.gold >= 84) {
        this.gold -= 84;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Shiny Ring": if (this.gold >= 126) {
        this.gold -= 126;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break; 
      case " Shiny Amulet": if (this.gold >= 132) {
        this.gold -= 132;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;      
      case " Ham": if (this.gold >= 34) {
        this.gold -= 34;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;  
      case " Hatchet": if (this.gold >= 216) {
        this.gold -= 216;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Kite Shield": if (this.gold >= 225) {
        this.gold -= 225;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Tin Helm": if (this.gold >= 129) {
        this.gold -= 129;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Studded Harness": if (this.gold >= 264) {
        this.gold -= 264;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Studded Legs": if (this.gold >= 252) {
        this.gold -= 252;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Studded Gloves": if (this.gold >= 216) {
        this.gold -= 216;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Hobnail Boots": if (this.gold >= 123) {
        this.gold -= 123;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Engraved Ring": if (this.gold >= 180) {
        this.gold -= 180;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break; 
      case " Engraved Amulet": if (this.gold >= 192) {
        this.gold -= 192;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;      
      case " Stew": if (this.gold >= 50) {
        this.gold -= 50;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;  
      case " Bronze Dagger": if (this.gold >= 291) {
        this.gold -= 291;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bronze Shield": if (this.gold >= 300) {
        this.gold -= 300;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bronze Helm": if (this.gold >= 165) {
        this.gold -= 165;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bronze Chainmail": if (this.gold >= 336) {
        this.gold -= 336;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;    
      case " Bronze Chainlegs": if (this.gold >= 324) {
        this.gold -= 324;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bronze Gloves": if (this.gold >= 291) {
        this.gold -= 291;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bronze Boots": if (this.gold >= 159) {
        this.gold -= 159;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Jade Ring": if (this.gold >= 225) {
        this.gold -= 225;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Jade Amulet": if (this.gold >= 240) {
        this.gold -= 240;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;              
  }
  document.getElementById("buy").style.visibility='hidden'; 
  this.updateStatus();
}
function mouseMove() {
  if ($('.mouse').hasClass('noDisplay')) {    
  }
  else {
  $('#mouseHead').css({'top': '380px', 'left': '320px'});
  $('#mouseLeftEar').css({'top': '352px', 'left': '325px'});
  $('#mouseRightEar').css({'top': '360px', 'left': '365px'});
  $('#mouseBody').css({'top': '400px', 'left': '345px'});
  $('#mouseFloor').css({'top': '456px', 'left': '347px'});
  $('#mouseTail').css({'top': '410px', 'left': '405px'});
  $('#mouseNose').css({'top': '418px', 'left': '328px'});
  $('#mouseWhisker1').css({'top': '423px', 'left': '306px'});
  $('#mouseWhisker2').css({'top': '418px', 'left': '307px'});
  $('#mouseWhisker3').css({'top': '428px', 'left': '308px'});
  $('#mouseWhisker4').css({'top': '426px', 'left': '341px'});
  $('#mouseWhisker5').css({'top': '423px', 'left': '341px'});
  $('#mouseWhisker6').css({'top': '433px', 'left': '341px'});
  $('#mouseLeftPupil').css({'top': '0px', 'left': '2px'});
  $('#mouseRightPupil').css({'top': '0px', 'left': '2px'});    
  }
}
function mouseBack() {
  if ($('.mouse').hasClass('noDisplay')) {    
  }
  else {
  $('#mouseHead').css({'top': '600px', 'left': '690px'});
  $('#mouseLeftEar').css({'top': '572px', 'left': '695px'});
  $('#mouseRightEar').css({'top': '580px', 'left': '735px'});
  $('#mouseBody').css({'top': '620px', 'left': '715px'});
  $('#mouseFloor').css({'top': '676px', 'left': '717px'});
  $('#mouseTail').css({'top': '630px', 'left': '775px'});
  $('#mouseNose').css({'top': '638px', 'left': '698px'});
  $('#mouseWhisker1').css({'top': '643px', 'left': '676px'});
  $('#mouseWhisker2').css({'top': '638px', 'left': '677px'});
  $('#mouseWhisker3').css({'top': '648px', 'left': '678px'});
  $('#mouseWhisker4').css({'top': '646px', 'left': '711px'});
  $('#mouseWhisker5').css({'top': '643px', 'left': '711px'});
  $('#mouseWhisker6').css({'top': '653px', 'left': '711px'});
  $('#mouseLeftPupil').css({'top': '8px', 'left': '2px'});
  $('#mouseRightPupil').css({'top': '8px', 'left': '3px'});     
  }
}
function ratMove() {
  if ($('.rat').hasClass('noDisplay')) {    
  }
  else {
  $('#ratHead').css('transform', 'rotate(-35deg)'); 
  $('#ratNose').css({'top': '578px', 'left': '671px'}); 
  $('#ratLeftEar').css({'top': '480px', 'left': '700px'}); 
  $('#ratRightEar').css({'top': '515px', 'left': '755px'});
  $('#ratLeftTooth').css({'top': '585px', 'left': '671px'});
  $('#ratRightTooth').css({'top': '587px', 'left': '681px'});
  $('#ratWhisker1').css({'top': '573px', 'left': '633px', 'transform': 'rotate(20deg)'}); 
  $('#ratWhisker2').css({'top': '566px', 'left': '639px', 'transform': 'rotate(45deg)'});
  $('#ratWhisker3').css({'top': '584px', 'left': '633px', 'transform': 'rotate(-5deg)'});
  $('#ratWhisker4').css({'top': '605px', 'left': '690px', 'transform': 'rotate(35deg)'});
  $('#ratWhisker5').css({'top': '595px', 'left': '692px', 'transform': 'rotate(10deg)'});
  $('#ratWhisker6').css({'top': '611px', 'left': '681px', 'transform': 'rotate(60deg)'});
  $('#ratLeftPupil').css({'width': '8px', 'height': '8px', 'top': '6px'}); 
  $('#ratRightPupil').css({'width': '8px', 'height': '8px', 'top': '6px'}); 
  $('#ratLaser').css('display','block');
  }
}
function ratBack() {
  if ($('.rat').hasClass('noDisplay')) {    
  }
  else {
  $('#ratHead').css('transform', 'rotate(-55deg)'); 
  $('#ratNose').css({'top': '590px', 'left': '688px'}); 
  $('#ratLeftEar').css({'top': '480px', 'left': '690px'}); 
  $('#ratRightEar').css({'top': '495px', 'left': '755px'});
  $('#ratLeftTooth').css({'top': '597px', 'left': '688px'});
  $('#ratRightTooth').css({'top': '599px', 'left': '698px'});
  $('#ratWhisker1').css({'top': '600px', 'left': '647px', 'transform': 'rotate(0deg)'}); 
  $('#ratWhisker2').css({'top': '590px', 'left': '648px', 'transform': 'rotate(25deg)'});
  $('#ratWhisker3').css({'top': '610px', 'left': '648px', 'transform': 'rotate(-25deg)'});
  $('#ratWhisker4').css({'top': '609px', 'left': '708px', 'transform': 'rotate(15deg)'});
  $('#ratWhisker5').css({'top': '600px', 'left': '708px', 'transform': 'rotate(-10deg)'});
  $('#ratWhisker6').css({'top': '618px', 'left': '705px', 'transform': 'rotate(40deg)'});
  $('#ratLeftPupil').css({'width': '3px', 'height': '3px', 'top': '8px'}); 
  $('#ratRightPupil').css({'width': '3px', 'height': '3px', 'top': '8px'}); 
  $('#ratLaser').css('display','none');
  }
}
function dogMove() {
  if ($('.dog').hasClass('noDisplay')) {    
  }
  else {
  $('#dogHead').css({'left': '170px'});
  $('#dogLeftEar').css({'left': '205px'});
  $('#dogLeftEarBorder1').css({'left': '215px'});
  $('#dogLeftEarBorder2').css({'left': '235px'});
  $('#dogRightEar').css({'left': '283px'});
  $('#dogRightEarBorder1').css({'left': '303px'});
  $('#dogRightEarBorder2').css({'left': '316px'});
  $('#dogBelly').css({'left': '215px'}); 
  $('#dogBody').css({'left': '215px'}); 
  $('#dogFloor').css({'left': '195px'}); 
  $('#dogTail').css({'left': '394px'}); 
  $('#dogNose').css({'left': '191px'});  
  $('#dogNosePoint').css({'left': '193px'}); 
  $('#dogFoot1').css({'left': '195px'});
  $('#dogLeg').css({'left': '263px'}); 
  $('#dogFoot2').css({'left': '234px'}); 
  $('#dogFoot3').css({'left': '289px'});
  $('#leftPupil').css('top', '32px');
  }
}
function dogBack() {
  if ($('.dog').hasClass('noDisplay')) {    
  }
  else {
  $('#dogHead').css({'left': '670px'});
  $('#dogLeftEar').css({'left': '705px'});
  $('#dogLeftEarBorder1').css({'left': '715px'});
  $('#dogLeftEarBorder2').css({'left': '735px'});
  $('#dogRightEar').css({'left': '783px'});
  $('#dogRightEarBorder1').css({'left': '803px'});
  $('#dogRightEarBorder2').css({'left': '816px'});
  $('#dogBelly').css({'left': '715px'}); 
  $('#dogBody').css({'left': '715px'}); 
  $('#dogFloor').css({'left': '695px'}); 
  $('#dogTail').css({'left': '894px'}); 
  $('#dogNose').css({'left': '691px'});  
  $('#dogNosePoint').css({'left': '693px'}); 
  $('#dogFoot1').css({'left': '695px'});
  $('#dogLeg').css({'left': '763px'}); 
  $('#dogFoot2').css({'left': '734px'}); 
  $('#dogFoot3').css({'left': '789px'});
  $('#leftPupil').css('top', '22px');    
  }
}
function wolfMove() {
  if ($('.wolf').hasClass('noDisplay')) {    
  }
  else {
  $('#wolfHead').css({'top': '320px', 'left': '520px', 'transform': 'rotate(-150deg)'}); 
  $('#wolfRightEye').css({'display': 'none'});  
  $('#wolfLeftEye').css({'top': '70px', 'left': '100px'}); 
  $('#wolfLeftPupil').css({'top': '20px', 'left': '40px'});  
  $('#wolfRightEarBorder1').css({'left': '727px'}); 
  $('#wolfRightEarBorder2').css({'left': '737px'}); 
  $('#wolfRightEar').css({'left': '690px'});
  $('#wolfNose').css({'top': '315px', 'left': '520px', 'width': '40px', 'transform': 'rotate(30deg)', 'border-radius': '50%'});     
  $('#wolfNosePoint').css({'display': 'none'}); 
  $('#wolfLeftToothLeft').css({'display': 'none'}); 
  $('#wolfLeftToothRight').css({'display': 'none'});
  $('#wolfRightToothLeft').css({'display': 'none'}); 
  $('#wolfRightToothRight').css({'display': 'none'}); 
  $('#wolfMouth').css({'display': 'block'});
  $('#wolfFoot1').css({'left': '585px'});  
  $('#wolfLeg').css({'left': '675px'});     
  $('#wolfFoot2').css({'left': '634px'}); 
  $('#wolfFoot3').css({'left': '710px'});
  $('#wolfBelly').css({'width': '140px'});
  $('#wolfFloor').css({'width': '232px', 'left': '585px'});  
  $('#wolfHowl').css({'display': 'block'});    
  }
}
function wolfBack() {
  if ($('.wolf').hasClass('noDisplay')) {    
  }
  else {
  $('#wolfHead').css({'top': '370px', 'left': '550px',  'transform': 'rotate(-55deg)'});  
  $('#wolfRightEye').css({'display': 'block'}); 
  $('#wolfLeftEye').css({'top': '-10px','left': '75px'});  
  $('#wolfLeftPupil').css({'top': '6px', 'left': '6px'});  
  $('#wolfRightEarBorder1').css({'left': '757px'}); 
  $('#wolfRightEarBorder2').css({'left': '767px'}); 
  $('#wolfRightEar').css({'left': '720px'});
  $('#wolfNose').css({'top': '499px', 'left': '583px', 'width': '65px', 'transform': 'rotate(18deg)', 'border-radius': '40%'});    
  $('#wolfNosePoint').css({'display': 'block'}); 
  $('#wolfLeftToothLeft').css({'display': 'block'}); 
  $('#wolfLeftToothRight').css({'display': 'block'});
  $('#wolfRightToothLeft').css({'display': 'block'}); 
  $('#wolfRightToothRight').css({'display': 'block'});
  $('#wolfMouth').css({'display': 'none'});
  $('#wolfFoot1').css({'left': '575px'});  
  $('#wolfLeg').css({'left': '685px'});     
  $('#wolfFoot2').css({'left': '644px'}); 
  $('#wolfFoot3').css({'left': '720px'});
  $('#wolfBelly').css({'width': '150px'}); 
  $('#wolfFloor').css({'width': '242px', 'left': '575px'});
  $('#wolfHowl').css({'display': 'none'}); 
  }
}
function goblinMove() {
  if ($('.goblin').hasClass('noDisplay')) {    
  }
  else {
  $('#goblinRightArm').css({'top': '427px', 'transform': 'rotate(80deg)'}); 
  $('#goblinWeapon2').css({'left': '250px', 'transform': 'rotate(-80deg)'});  
  $('#goblinHilt2').css({'top': '415px', 'left': '260px', 'transform': 'rotate(10deg)'});    
  }
}
function goblinBack() {
  if ($('.goblin').hasClass('noDisplay')) {    
  }
  else {
  $('#goblinRightArm').css({'top': '409px', 'transform': 'rotate(110deg)'}); 
  $('#goblinWeapon2').css({'left': '595px', 'transform': 'rotate(20deg)'});  
  $('#goblinHilt2').css({'top': '419px', 'left': '593px', 'transform': 'rotate(110deg)'});    
  }
}
function orcMove() {
  if ($('.orc').hasClass('noDisplay')) {    
  }
  else {
  $('#orcRightArm').css({'top': '345px', 'left': '615px', 'transform': 'rotate(65deg)'}); 
  $('#orcAxeHead').css({'top': '270px', 'left': '500px', 'transform': 'rotate(-115deg)'});  
  $('#orcAxeHandle').css({'top': '270px', 'left': '565px', 'transform': 'rotate(-25deg)'});    
  }  
}
function orcBack() {
  if ($('.orc').hasClass('noDisplay')) {    
  }
  else {
  $('#orcRightArm').css({'top': '300px', 'left': '620px', 'transform': 'rotate(110deg)'}); 
  $('#orcAxeHead').css({'top': '200px', 'left': '580px', 'transform': 'rotate(-70deg)'});  
  $('#orcAxeHandle').css({'top': '200px', 'left': '610px', 'transform': 'rotate(20deg)'});    
  }  
}
function ogreMove() {
  if ($('.ogre').hasClass('noDisplay')) {    
  }
  else {
  $('#ogreRightArm').css({'top': '305px', 'left': '613px', 'transform': 'rotate(65deg)'}); 
  $('#ogreWeaponHead').css({'top': '180px', 'left': '480px', 'transform': 'rotate(-25deg)'});  
  $('#ogreWeaponHandle').css({'top': '245px', 'left': '555px', 'transform': 'rotate(-25deg)'});   
  }  
}
function ogreBack() {
  if ($('.ogre').hasClass('noDisplay')) {    
  }
  else {
  $('#ogreRightArm').css({'top': '275px', 'left': '610px', 'transform': 'rotate(90deg)'}); 
  $('#ogreWeaponHead').css({'top': '135px', 'left': '545px', 'transform': 'rotate(0deg)'});  
  $('#ogreWeaponHandle').css({'top': '200px', 'left': '580px', 'transform': 'rotate(0deg)'});    
  }  
}
function heroMove() {
  $('#weapon').css({'left': '345px','top':'270px', 'transform':'rotate(40deg)'}); 
  $('#hilt').css({'left': '306px', 'top':'389px', 'transform':'rotate(40deg)'});
  $('#hitsplat').css('display','block');
  $('#hit').css('display','block');
  $('#rightEye').css('display', 'none');
  $('#leftEye').css('left', '53px');
  $('#leftPupil').css({'left': '27px', 'top': '22px'}); 
  $('#leftEyebrow').css('transform', 'rotate(25deg)');  
  $('#leftArm').css('left', '202px');  
  $('#rightArm').css({'transform': 'rotate(45deg)', 'left': '218px', 'top': '362px'});
  $('#shield').css('left', '220px');
  $('#leftLeg').css('left', '200px');
  $('#rightLeg').css({'left': '215px', 'top': '511px', 'height': '120px'});
  $('#leftFoot').css('left', '204px');
  $('#leftSole').css('left', '204px'); 
  $('#rightFoot').css({'left': '218px', 'top': '618px'});
  $('#rightSole').css({'left': '218px', 'top': '630px'});  

}
function heroBack() {
  $('#weapon').css({'left': '340px', 'top': '202px', 'transform': 'rotate(0deg)'}); 
  $('#hilt').css({'left': '332px', 'top': '330px', 'transform': 'rotate(0deg)'});
  $('#rightArm').css({'transform': 'rotate(0deg)', 'left': '241px', 'top': '339px'});
  $('#hitsplat').css('display','none');
  $('#hit').css('display','none');
}
// event handler
$(document).ready(function(){
    $('#attackButtonDiv').on('click', 'button', function() {
    heroMove();
    setTimeout(function() {
      heroBack();
    }, [600]);
    setTimeout(function() {
      ratMove();
      mouseMove();
      dogMove();
      wolfMove();
      goblinMove();
      orcMove();
      ogreMove();
      $('#enemysplat').css('display','block');
      $('#enemyhit').css('display','block');
      $('#leftEyebrow').css('transform', 'rotate(-5deg)'); 
      setTimeout(function() {
        ratBack(); 
        mouseBack();
        dogBack();
        wolfBack();
        goblinBack();
        orcBack();
        ogreBack();
        $('#enemysplat').css('display','none');
        $('#enemyhit').css('display','none');
        $('#leftEyebrow').css('transform', 'rotate(25deg)'); 
        $('.eye').css('background-color', 'white'); 
        $('#shield').css({'width': '100px', 'height': '100px'}); 
      }, [600]);
    }, [700]);
  });  
});
$(document).ready(function(){
  $('#close').on('click', 'button', function() {
  $('#wrapper').addClass('noDisplay');
  $('#stock').removeClass('noDisplay');
  document.getElementById("close").style.visibility='hidden';    
  });
});
function Character() {
  this.level = 1;
  this.nextLevelXp = 10;
  this.xp = 0;
  this.hp = 15;
  this.equipHp = 0;
  this.baseMaxHp = 15;
  this.maxHp = this.equipHp + this.baseMaxHp;
  this.baseStr = 1;  
  this.baseHit = 1;
  this.equipStr = 1;
  this.equipHit = 0; 
  this.baseDef = 1;
  this.baseDodge = 1;
  this.equipDef = this.chestDef + this.legDef + this.helmDef;
  this.equipDodge = this.shieldDodge + this.bootDodge;
  this.chestDef = 0; 
  this.legDef = 1;   
  this.helmDef = 0;
  this.shieldDodge = 0;
  this.bootDodge = 1;
  this.baseLuck = 1;
  this.equipLuck = 0;
  this.str = this.baseStr + this.equipStr;
  this.hit = this.baseHit + this.equipHit;
  this.def = this.baseDef + this.equipDef;
  this.dodge = this.baseDodge + this.equipDodge;  
  this.luck = this.baseLuck + this.equipLuck;
  this.use = use;
  this.weapon = " Stick";
  this.shield = "None";
  this.helm = "None";
  this.chest = "None"; 
  this.legs = " Swimming Trunks";
  this.gloves = "None";
  this.boots = " Sandals"; 
  this.ring = "None";
  this.amulet = "None";  
  this.points = 2;
  this.gold = 10;
  this.equipment = [];
  this.energy = 15;
  this.maxEnergy = 15;
  this.updateTime = updateTime;
  this.healthRegen = healthRegen;
  this.strPlus = strPlus;
  this.hitPlus = hitPlus;
  this.dodgePlus = dodgePlus;
  this.defPlus = defPlus;
  this.luckPlus = luckPlus;
  this.checkLevel = checkLevel;
  this.fight = fight;
  this.lowDrop = lowDrop;
  this.select = select;
  this.find = find;
  this.selectShop = selectShop;
  this.findShop = findShop;
  this.buy = buy;
  this.sell = sell;
  this.changeStock = changeStock;
  this.findTier = findTier;
  this.selectTier = selectTier;
  this.updateStatus = updateStatus;
}
var Paul = new Character();
Paul.updateStatus();
