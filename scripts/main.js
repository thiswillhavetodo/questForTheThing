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
var mouse = {
  name: "Mouse",
  energyCost: 3,
  level: 1,
  hp: 6,
  maxHp: 6,
  str: 1,
  hit: 2,
  def: 1,
  dodge: 1,
  xpWin: 9,
  xpDraw: 5,
  xpLose: 3,
  //  dropTable: "lowDrop",
  difficulty: 1
};
var rat = {
  name: "Rat",
  energyCost: 4,
  level: 3,
  hp: 20,
  maxHp: 20,
  str: 3,
  hit: 5,
  def: 3,
  dodge: 3,
  xpWin: 14,
  xpDraw: 7,
  xpLose: 4,
  //  dropTable: "lowDrop",
  difficulty: 3
};
var dog = {
  name: "Dog",
  energyCost: 5,
  level: 5,
  hp: 37,
  maxHp: 37,
  str: 6,
  hit: 9,
  def: 7,
  dodge: 5,
  xpWin: 21,
  xpDraw: 10,
  xpLose: 5,
  //  dropTable: "lowDrop",
  difficulty: 5
};
var wolf = {
  name: "Wolf",
  level: 7,
  energyCost: 6,
  hp: 59,
  maxHp: 59,
  str: 12,
  hit: 11,
  def: 8,
  dodge: 9,
  xpWin: 28,
  xpDraw: 14,
  xpLose: 7,
  //  dropTable: "lowDrop",
  difficulty: 8
};
var goblin = {
  name: "Goblin",
  level: 10,
  energyCost: 7,
  hp: 83,
  maxHp: 83,
  str: 18,
  hit: 17,
  def: 15,
  dodge: 14,
  xpWin: 36,
  xpDraw: 18,
  xpLose: 9,
  //  dropTable: "medDrop",
  difficulty: 11
};
var orc = {
  name: "Orc",
  level: 13,
  energyCost: 8,
  hp: 99,
  maxHp: 99,
  str: 23,
  hit: 21,
  def: 21,
  dodge: 18,
  xpWin: 46,
  xpDraw: 23,
  xpLose: 11,
  //  dropTable: "medDrop",
  difficulty: 14
};
var ogre = {
  name: "Ogre",
  level: 16,
  energyCost: 9,
  hp: 125,
  maxHp: 125,
  str: 28,
  hit: 25,
  def: 26,
  dodge: 23,
  xpWin: 57,
  xpDraw: 29,
  xpLose: 14,
  //  dropTable: "medDrop",
  difficulty: 17
};
function fight(enemy) {  
  this.updateStatus();
  fightResult.innerHTML = "";
  result.innerHTML = "";
  youHit.innerHTML = "";
  enemy_Hit.innerHTML = "";
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
  enemy.hp = enemy.maxHp;
  document.getElementById("attack" + enemy.name).style.visibility='visible';
  this.energy -= enemy.energyCost;
  var yourDamageThisRound = 0;
  var enemyDamageThisRound = 0;
  var space = "<br/>";
  yourHP.innerHTML = "Your health: " + this.hp;
  enemyHP.innerHTML = enemy.name + " health: " + enemy.hp;
  var self = this;  
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
  youHit.innerHTML += "You hit: " + yourDamageThisRound + space;  
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
  enemy_Hit.innerHTML += enemy.name + " hits: " + enemyDamageThisRound + space; 
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
      self.updateStatus();
      document.getElementById("attack" + enemy.name).style.visibility='hidden';
      berserkScore = 5;
      invulnerableScore = 4;        
    }
    else if (self.hp < 1 && enemy.hp > 0) {
      fightResult.innerHTML = "You lose! You receive " + enemy.xpLose + " Experience Points and pay 2 Energy for resurrection.";
      self.xp += enemy.xpLose;
      fighting = false;
      self.updateStatus();
      document.getElementById("attack" + enemy.name).style.visibility='hidden';
      berserkScore = 5;
      invulnerableScore = 4;        
     }
  };
    berserk = function()  {
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
  youHit.innerHTML += "You hit: " + yourDamageThisRound + space;  
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
  enemy_Hit.innerHTML += enemy.name + " hits: " + enemyDamageThisRound + space; 
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
      self.updateStatus();
      document.getElementById("attack" + enemy.name).style.visibility='hidden';
      berserkScore = 5;
      invulnerableScore = 4;        
    }
    else if (self.hp < 1 && enemy.hp > 0) {
      fightResult.innerHTML = "You lose! You receive " + enemy.xpLose + " Experience Points and pay 2 Energy for resurrection.";
      self.xp += enemy.xpLose;
      fighting = false;
      self.updateStatus();
      document.getElementById("attack" + enemy.name).style.visibility='hidden';
      berserkScore = 5;
      invulnerableScore = 4;        
     }
  };
  
    
  invulnerable = function()  {
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
  youHit.innerHTML += "You hit: " + yourDamageThisRound + space;  
  enemy.hp -= yourDamageThisRound; 
  enemyHP.innerHTML = enemy.name + " health: " + enemy.hp;
  enemyDamageThisRound = 0; 
  enemy_Hit.innerHTML += enemy.name + " hits: " + enemyDamageThisRound + space; 
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
  this.nextLevelXp = 11 + ((this.level-1)*(13 + (this.level+2)));
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
  result.innerHTML = "Congratulations, you reach level " + this.level + " and claim 10 gold as a reward. <br/>You have " + this.points + " points to spend and your Hit Points have increased to " + this.hp + ".<br/>You now have " + this.xp + " Experience Points. Next level at " + this.nextLevelXp + ".";
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
  var dropRoll = luckValue + difficulty + ranInt(1, 9);
  switch(dropRoll) {
    case 3: drop = "1 gold coin";
        this.gold += 1;
        break;
    case 4: drop = "a Crust of Bread";
        this.equipment[this.equipment.length] = " Bread";        
        break;
    case 5: drop = "2 gold coins";
        this.gold += 2;
        break;           
    case 6: drop = "a Pair of Cloth Boots";
        this.equipment[this.equipment.length] = " Cloth Boots";
        break;      
    case 7: drop = "4 gold coins";
        this.gold += 4;        
        break; 
    case 8: drop = "5 gold coins";
        this.gold += 5;
        break;
    case 9: drop = "a Piece of Cheese";
        this.equipment[this.equipment.length] = " Cheese";        
        break;         
    case 10: drop = "a Wooden Shield";
        this.equipment[this.equipment.length] = " Wooden Shield";        
        break;    
    case 11: drop = "a Piece of Cheese and 2 gold coins";
        this.equipment[this.equipment.length] = " Cheese"; 
        this.gold += 2;      
        break;       
    case 12: drop = "a Cloth Shirt";
        this.equipment[this.equipment.length] = " Cloth Shirt";        
        break;     
    case 13: drop = "7 gold coins";
        this.gold += 7;
        break;
    case 14: drop = "a Wooden Training Sword";
        this.equipment[this.equipment.length] = " Wooden Sword";
        break;
    case 15: drop = "9 gold coins";
        this.gold += 9;
        break;
    case 16: drop = "a Leather Hat";
        this.equipment[this.equipment.length] = " Leather Hat";        
        break;  
    case 17: drop = "a Pair of Leather Leggings";
        this.equipment[this.equipment.length] = " Leather Legs";        
        break;      
    case 18: drop = "a Leg of Ham";
        this.equipment[this.equipment.length] = " Ham";        
        break;
    case 19: drop = "13 gold coins";
        this.gold += 13;
        break;      
    case 20: drop = "a Leg of Ham and 3 gold coins";
        this.gold += 3;      
        this.equipment[this.equipment.length] = " Ham";        
        break;      
    case 21: drop = "a Bone Helm and 3 gold coins";
        this.equipment[this.equipment.length] = " Bone Helm";
        this.gold += 3;
        break;       
    case 22: drop = "15 gold coins";
        this.gold += 15;
        break; 
    case 23: drop = "a Bone Club";
        this.equipment[this.equipment.length] = " Bone Club";
        break;
    case 24: drop = "17 gold coins";
        this.gold += 17;
        break;
    case 25: drop = "a Leg of Ham and 9 gold coins";
        this.gold += 9;      
        this.equipment[this.equipment.length] = " Ham";        
        break;                
    case 26: drop = "a Bone Chestplate";
        this.equipment[this.equipment.length] = " Bone Chestplate";        
        break;
    case 27: drop = "21 gold coins";
        this.gold += 21;
        break;       
    case 28: drop = "a Kite Shield";
        this.equipment[this.equipment.length] = " Kite Shield";        
        break;      
    case 29: drop = "24 gold coins";
        this.gold += 24;
        break; 
    case 30: drop = "a Pair of Studded Leggings";
        this.equipment[this.equipment.length] = " Studded Legs";
        break;     
    case 31: drop = "29 gold coins";   
        this.gold += 29;
        break; 
    case 32: drop = "30 gold coins";   
        this.gold += 30;
        break;         
    case 33: drop = "a Pair of Bronze Gloves";
        this.equipment[this.equipment.length] = " Bronze Gloves";
        break;            
    default: drop = "34 gold coins";   
        this.gold += 34;
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
    case " Stick": this.gold += 4;
    break;
    case " Cheese": this.gold += 5;
    break;
    case " Cloth Shirt": this.gold += 7;
    break;
    case " Cloth Legs": this.gold += 7;
    break;
    case " Cloth Hat": this.gold += 4;
    break;
    case " Cloth Gloves": this.gold += 6;
    break;
    case " Cloth Boots": this.gold += 4;
    break;    
    case " Wooden Sword": this.gold += 6;
    break;
    case " Wooden Shield": this.gold += 6;
    break;
    case " Worn Ring": this.gold += 5;
    break;
    case " Tarnished Ring": this.gold += 10;
    break;
    case " Shiny Ring": this.gold += 16;
    break;
    case " Worn Amulet": this.gold += 5;
    break;
    case " Tarnished Amulet": this.gold += 10;
    break;
    case " Shiny Amulet": this.gold += 16;
    break;
    case " Ham": this.gold += 10;
    break;     
    case " Leather Shirt": this.gold += 16;
    break;
    case " Leather Legs": this.gold += 14;
    break;
    case " Leather Hat": this.gold += 7;
    break;
    case " Leather Gloves": this.gold += 12;
    break;
    case " Leather Boots": this.gold += 7;
    break;    
    case " Truncheon": this.gold += 12;
    break;
    case " Hardwood Shield": this.gold += 13;
    break;
    case " Bone Chestplate": this.gold += 24;
    break;
    case " Hard Leather Legs": this.gold += 22;
    break;
    case " Bone Helm": this.gold += 12;
    break;
    case " Hard Leather Mitts": this.gold += 19;
    break;
    case " Hard Leather Boots": this.gold += 11;
    break;    
    case " Bone Club": this.gold += 19;
    break;
    case " Reinforced Shield": this.gold += 20;
    break;    
    case " Hatchet": this.gold += 22;
    break;    
    case " Kite Shield": this.gold += 23;
    break;
    case " Tin Helm": this.gold += 14;
    break;
    case " Studded Harness": this.gold += 28;
    break;
    case " Studded Legs": this.gold += 27;
    break;
    case " Studded Gloves": this.gold += 23;
    break;
    case " Hobnail Boots": this.gold += 13;
    break;
    case " Engraved Ring": this.gold += 19;
    break;    
    case " Engraved Amulet": this.gold += 20;
    break;
    case " Stew": this.gold += 15;
    break; 
    case " Bronze Dagger": this.gold += 30;
    break;    
    case " Bronze Shield": this.gold += 31;
    break;
    case " Bronze Helm": this.gold += 18;
    break;
    case " Bronze Chainmail": this.gold += 37;
    break;
    case " Bronze Chainlegs": this.gold += 36;
    break;
    case " Bronze Gloves": this.gold += 30;
    break;
    case " Bronze Boots": this.gold += 17;
    break;
    case " Jade Ring": this.gold += 25;
    break;    
    case " Jade Amulet": this.gold += 26;
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
    case " Wooden Sword": if(this.weapon !== "None") {
      this.equipment[this.equipment.length] = this.weapon;
    }
      this.weapon = " Wooden Sword"; 
      this.equipStr = 2;  
      break;
    case " Wooden Shield": if(this.shield !== "None") {
      this.equipment[this.equipment.length] = this.shield;
    }
      this.shield = " Wooden Shield"; 
      this.shieldDodge = 2;  
      break;   
    case " Cloth Shirt": if(this.chest !== "None") {
      this.equipment[this.equipment.length] = this.chest;
    }
      this.chest = " Cloth Shirt"; 
      this.chestDef = 2;   
      break;
    case " Cloth Legs": if(this.legs !== "None") {
      this.equipment[this.equipment.length] = this.legs;
    }
      this.legs = " Cloth Legs"; 
      this.legDef = 2;   
      break;   
    case " Cloth Hat": if(this.helm !== "None") {
      this.equipment[this.equipment.length] = this.helm;
    }
      this.helm = " Cloth Hat"; 
      this.helmDef = 1;  
      break;  
    case " Cloth Boots": if(this.boots !== "None") {
      this.equipment[this.equipment.length] = this.boots;
    }
      this.boots = " Cloth Boots"; 
      this.bootDodge = 1;  
      break; 
    case " Cloth Gloves": if(this.gloves !== "None") {
      this.equipment[this.equipment.length] = this.gloves;
    }
      this.gloves = " Cloth Gloves"; 
      this.equipHit = 2;  
      break; 
    case " Worn Ring": if(this.ring !== "None") {
      this.equipment[this.equipment.length] = this.ring;
    }
      this.ring = " Worn Ring"; 
      this.equipLuck = 1;  
      break;   
    case " Worn Amulet": if(this.amulet !== "None") {
      this.equipment[this.equipment.length] = this.amulet;
    }
      this.amulet = " Worn Amulet"; 
      this.equipHp = 5;  
      break;       
    case " Truncheon": if(this.weapon !== "None") {
      this.equipment[this.equipment.length] = this.weapon;
    }
      this.weapon = " Truncheon"; 
      this.equipStr = 4;  
      break;
    case " Hardwood Shield": if(this.shield !== "None") {
      this.equipment[this.equipment.length] = this.shield;
    }
      this.shield = " Hardwood Shield"; 
      this.shieldDodge = 4;  
      break;   
    case " Leather Shirt": if(this.chest !== "None") {
      this.equipment[this.equipment.length] = this.chest;
    }
      this.chest = " Leather Shirt"; 
      this.chestDef = 4;   
      break;
    case " Leather Legs": if(this.legs !== "None") {
      this.equipment[this.equipment.length] = this.legs;
    }
      this.legs = " Leather Legs"; 
      this.legDef = 4;   
      break;   
    case " Leather Hat": if(this.helm !== "None") {
      this.equipment[this.equipment.length] = this.helm;
    }
      this.helm = " Leather Hat"; 
      this.helmDef = 2;  
      break;  
    case " Leather Boots": if(this.boots !== "None") {
      this.equipment[this.equipment.length] = this.boots;
    }
      this.boots = " Leather Boots"; 
      this.bootDodge = 2;  
      break; 
    case " Leather Gloves": if(this.gloves !== "None") {
      this.equipment[this.equipment.length] = this.gloves;
    }
      this.gloves = " Leather Gloves"; 
      this.equipHit = 4;  
      break; 
    case " Tarnished Ring": if(this.ring !== "None") {
      this.equipment[this.equipment.length] = this.ring;
    }
      this.ring = " Tarnished Ring"; 
      this.equipLuck = 2;  
      break;
    case " Tarnished Amulet": if(this.amulet !== "None") {
      this.equipment[this.equipment.length] = this.amulet;
    }
      this.amulet = " Tarnished Amulet"; 
      this.equipHp = 10;  
      break;       
    case " Bone Club": if(this.weapon !== "None") {
      this.equipment[this.equipment.length] = this.weapon;
    }
      this.weapon = " Bone Club"; 
      this.equipStr = 6;  
      break;
    case " Reinforced Shield": if(this.shield !== "None") {
      this.equipment[this.equipment.length] = this.shield;
    }
      this.shield = " Reinforced Shield"; 
      this.shieldDodge = 6;  
      break;   
    case " Bone Chestplate": if(this.chest !== "None") {
      this.equipment[this.equipment.length] = this.chest;
    }
      this.chest = " Bone Chestplate"; 
      this.chestDef = 6;   
      break;
    case " Hard Leather Legs": if(this.legs !== "None") {
      this.equipment[this.equipment.length] = this.legs;
    }
      this.legs = " Hard Leather Legs"; 
      this.legDef = 6;   
      break;   
    case " Bone Helm": if(this.helm !== "None") {
      this.equipment[this.equipment.length] = this.helm;
    }
      this.helm = " Bone Helm"; 
      this.helmDef = 3;  
      break;  
    case " Hard Leather Boots": if(this.boots !== "None") {
      this.equipment[this.equipment.length] = this.boots;
    }
      this.boots = " Hard Leather Boots"; 
      this.bootDodge = 3;  
      break; 
    case " Hard Leather Mitts": if(this.gloves !== "None") {
      this.equipment[this.equipment.length] = this.gloves;
    }
      this.gloves = " Hard Leather Mitts"; 
      this.equipHit = 6;  
      break; 
    case " Shiny Ring": if(this.ring !== "None") {
      this.equipment[this.equipment.length] = this.ring;
    }
      this.ring = " Shiny Ring"; 
      this.equipLuck = 3;  
      break; 
    case " Shiny Amulet": if(this.amulet !== "None") {
      this.equipment[this.equipment.length] = this.amulet;
    }
      this.amulet = " Shiny Amulet"; 
      this.equipHp = 15;  
      break;   
    case " Hatchet": if(this.weapon !== "None") {
      this.equipment[this.equipment.length] = this.weapon;
    }
      this.weapon = " Hatchet"; 
      this.equipStr = 8;  
      break;
    case " Kite Shield": if(this.shield !== "None") {
      this.equipment[this.equipment.length] = this.shield;
    }
      this.shield = " Kite Shield"; 
      this.shieldDodge = 8;  
      break;   
    case " Studded Harness": if(this.chest !== "None") {
      this.equipment[this.equipment.length] = this.chest;
    }
      this.chest = " Studded Harness"; 
      this.chestDef = 8;   
      break;
    case " Studded Legs": if(this.legs !== "None") {
      this.equipment[this.equipment.length] = this.legs;
    }
      this.legs = " Studded Legs"; 
      this.legDef = 8;   
      break;   
    case " Tin Helm": if(this.helm !== "None") {
      this.equipment[this.equipment.length] = this.helm;
    }
      this.helm = " Tin Helm"; 
      this.helmDef = 4;  
      break;  
    case " Hobnail Boots": if(this.boots !== "None") {
      this.equipment[this.equipment.length] = this.boots;
    }
      this.boots = " Hobnail Boots"; 
      this.bootDodge = 4;  
      break; 
    case " Studded Gloves": if(this.gloves !== "None") {
      this.equipment[this.equipment.length] = this.gloves;
    }
      this.gloves = " Studded Gloves"; 
      this.equipHit = 8;  
      break; 
    case " Engraved Ring": if(this.ring !== "None") {
      this.equipment[this.equipment.length] = this.ring;
    }
      this.ring = " Engraved Ring"; 
      this.equipLuck = 4;  
      break; 
    case " Engraved Amulet": if(this.amulet !== "None") {
      this.equipment[this.equipment.length] = this.amulet;
    }
      this.amulet = " Engraved Amulet"; 
      this.equipHp = 20;  
      break;     
    case " Bronze Dagger": if(this.weapon !== "None") {
      this.equipment[this.equipment.length] = this.weapon;
    }
      this.weapon = " Bronze Dagger"; 
      this.equipStr = 10;  
      break;
    case " Bronze Shield": if(this.shield !== "None") {
      this.equipment[this.equipment.length] = this.shield;
    }
      this.shield = " Bronze Shield"; 
      this.shieldDodge = 10;  
      break;   
    case " Bronze Chainmail": if(this.chest !== "None") {
      this.equipment[this.equipment.length] = this.chest;
    }
      this.chest = " Bronze Chainmail"; 
      this.chestDef = 10;   
      break;
    case " Bronze Chainlegs": if(this.legs !== "None") {
      this.equipment[this.equipment.length] = this.legs;
    }
      this.legs = " Bronze Chainlegs"; 
      this.legDef = 10;   
      break;   
    case " Bronze Helm": if(this.helm !== "None") {
      this.equipment[this.equipment.length] = this.helm;
    }
      this.helm = " Bronze Helm"; 
      this.helmDef = 5;  
      break;  
    case " Bronze Boots": if(this.boots !== "None") {
      this.equipment[this.equipment.length] = this.boots;
    }
      this.boots = " Bronze Boots"; 
      this.bootDodge = 5;  
      break; 
    case " Bronze Gloves": if(this.gloves !== "None") {
      this.equipment[this.equipment.length] = this.gloves;
    }
      this.gloves = " Bronze Gloves"; 
      this.equipHit = 10;  
      break; 
    case " Jade Ring": if(this.ring !== "None") {
      this.equipment[this.equipment.length] = this.ring;
    }
      this.ring = " Jade Ring"; 
      this.equipLuck = 5;  
      break; 
    case " Jade Amulet": if(this.amulet !== "None") {
      this.equipment[this.equipment.length] = this.amulet;
    }
      this.amulet = " Jade Amulet"; 
      this.equipHp = 25;  
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
    stockTable.rows[1].cells[1].innerHTML = 'Strength +2'; 
    stockTable.rows[1].cells[2].innerHTML = '14 gold'; 
    stockTable.rows[2].cells[0].innerHTML = 'Wooden Shield';
    stockTable.rows[2].cells[1].innerHTML = 'Evade +2';        
    stockTable.rows[2].cells[2].innerHTML = '15 gold';        
    stockTable.rows[3].cells[0].innerHTML = 'Cloth Hat';        
    stockTable.rows[3].cells[1].innerHTML = 'Defence +1';        
    stockTable.rows[3].cells[2].innerHTML = '8 gold';        
    stockTable.rows[4].cells[0].innerHTML = 'Cloth Shirt';  
    stockTable.rows[4].cells[1].innerHTML = 'Defence +2';    
    stockTable.rows[4].cells[2].innerHTML = '18 gold';    
    stockTable.rows[5].cells[0].innerHTML = 'Cloth Legs'; 
    stockTable.rows[5].cells[1].innerHTML = 'Defence +2';    
    stockTable.rows[5].cells[2].innerHTML = '16 gold'; 
    stockTable.rows[6].cells[0].innerHTML = 'Cloth Gloves';  
    stockTable.rows[6].cells[1].innerHTML = 'Accuracy +2';    
    stockTable.rows[6].cells[2].innerHTML = '15 gold';    
    stockTable.rows[7].cells[0].innerHTML = 'Cloth Boots'; 
    stockTable.rows[7].cells[1].innerHTML = 'Evade +1';    
    stockTable.rows[7].cells[2].innerHTML = '8 gold';
    stockTable.rows[8].cells[0].innerHTML = 'Worn Ring'; 
    stockTable.rows[8].cells[1].innerHTML = 'Luck +1';    
    stockTable.rows[8].cells[2].innerHTML = '12 gold'; 
    stockTable.rows[9].cells[0].innerHTML = 'Worn Amulet'; 
    stockTable.rows[9].cells[1].innerHTML = 'Max Health +5';    
    stockTable.rows[9].cells[2].innerHTML = '13 gold';    
  }
  else if (shopTier ==="2") { 
    shop = [" Truncheon", " Hardwood Shield", " Leather Hat", " Leather Shirt", " Leather Legs", " Leather Gloves", " Leather Boots", " Tarnished Ring", " Tarnished Amulet"];
    stockTable.rows[1].cells[0].innerHTML = 'Truncheon'; 
    stockTable.rows[1].cells[1].innerHTML = 'Strength +4'; 
    stockTable.rows[1].cells[2].innerHTML = '30 gold'; 
    stockTable.rows[2].cells[0].innerHTML = 'Hardwood Shield';
    stockTable.rows[2].cells[1].innerHTML = 'Evade +4';        
    stockTable.rows[2].cells[2].innerHTML = '32 gold';        
    stockTable.rows[3].cells[0].innerHTML = 'Leather Hat';        
    stockTable.rows[3].cells[1].innerHTML = 'Defence +2';        
    stockTable.rows[3].cells[2].innerHTML = '19 gold';        
    stockTable.rows[4].cells[0].innerHTML = 'Leather Shirt';  
    stockTable.rows[4].cells[1].innerHTML = 'Defence +4';    
    stockTable.rows[4].cells[2].innerHTML = '38 gold';    
    stockTable.rows[5].cells[0].innerHTML = 'Leather Legs'; 
    stockTable.rows[5].cells[1].innerHTML = 'Defence +4';    
    stockTable.rows[5].cells[2].innerHTML = '35 gold'; 
    stockTable.rows[6].cells[0].innerHTML = 'Leather Gloves';  
    stockTable.rows[6].cells[1].innerHTML = 'Accuracy +4';    
    stockTable.rows[6].cells[2].innerHTML = '30 gold';    
    stockTable.rows[7].cells[0].innerHTML = 'Leather Boots'; 
    stockTable.rows[7].cells[1].innerHTML = 'Evade +2';    
    stockTable.rows[7].cells[2].innerHTML = '17 gold'; 
    stockTable.rows[8].cells[0].innerHTML = 'Tarnished Ring'; 
    stockTable.rows[8].cells[1].innerHTML = 'Luck +2';    
    stockTable.rows[8].cells[2].innerHTML = '25 gold'; 
    stockTable.rows[9].cells[0].innerHTML = 'Tarnished Amulet'; 
    stockTable.rows[9].cells[1].innerHTML = 'Max Health +10';    
    stockTable.rows[9].cells[2].innerHTML = '26 gold';      
  }
  else if (shopTier ==="3") { 
    shop = [" Bone Club", " Reinforced Shield", " Bone Helm", " Bone Chestplate", " Hard Leather Legs", " Hard Leather Mitts", " Hard Leather Boots", " Shiny Ring", " Shiny Amulet"];
    stockTable.rows[1].cells[0].innerHTML = 'Bone Club'; 
    stockTable.rows[1].cells[1].innerHTML = 'Strength +6'; 
    stockTable.rows[1].cells[2].innerHTML = '50 gold'; 
    stockTable.rows[2].cells[0].innerHTML = 'Reinforced Shield';
    stockTable.rows[2].cells[1].innerHTML = 'Evade +6';        
    stockTable.rows[2].cells[2].innerHTML = '52 gold';        
    stockTable.rows[3].cells[0].innerHTML = 'Bone Helm';        
    stockTable.rows[3].cells[1].innerHTML = 'Defence +3';        
    stockTable.rows[3].cells[2].innerHTML = '31 gold';        
    stockTable.rows[4].cells[0].innerHTML = 'Bone Chestplate';  
    stockTable.rows[4].cells[1].innerHTML = 'Defence +6';    
    stockTable.rows[4].cells[2].innerHTML = '62 gold';    
    stockTable.rows[5].cells[0].innerHTML = 'Hard Leather Legs'; 
    stockTable.rows[5].cells[1].innerHTML = 'Defence +6';    
    stockTable.rows[5].cells[2].innerHTML = '57 gold'; 
    stockTable.rows[6].cells[0].innerHTML = 'Hard Leather Mitts';  
    stockTable.rows[6].cells[1].innerHTML = 'Accuracy +6';    
    stockTable.rows[6].cells[2].innerHTML = '50 gold';    
    stockTable.rows[7].cells[0].innerHTML = 'Hard Leather Boots'; 
    stockTable.rows[7].cells[1].innerHTML = 'Evade +3';    
    stockTable.rows[7].cells[2].innerHTML = '28 gold';
    stockTable.rows[8].cells[0].innerHTML = 'Shiny Ring'; 
    stockTable.rows[8].cells[1].innerHTML = 'Luck +3';    
    stockTable.rows[8].cells[2].innerHTML = '42 gold'; 
    stockTable.rows[9].cells[0].innerHTML = 'Shiny Amulet'; 
    stockTable.rows[9].cells[1].innerHTML = 'Max Health +15';    
    stockTable.rows[9].cells[2].innerHTML = '44 gold';    
  }
  else if (shopTier ==="4") { 
    shop = [" Hatchet", " Kite Shield", " Tin Helm", " Studded Harness", " Studded Legs", " Studded Gloves", " Hobnail Boots", " Engraved Ring", " Engraved Amulet"];
    stockTable.rows[1].cells[0].innerHTML = 'Hatchet'; 
    stockTable.rows[1].cells[1].innerHTML = 'Strength +8'; 
    stockTable.rows[1].cells[2].innerHTML = '72 gold'; 
    stockTable.rows[2].cells[0].innerHTML = 'Kite Shield';
    stockTable.rows[2].cells[1].innerHTML = 'Evade +8';        
    stockTable.rows[2].cells[2].innerHTML = '75 gold';        
    stockTable.rows[3].cells[0].innerHTML = 'Tin Helm';        
    stockTable.rows[3].cells[1].innerHTML = 'Defence +4';        
    stockTable.rows[3].cells[2].innerHTML = '43 gold';        
    stockTable.rows[4].cells[0].innerHTML = 'Studded Harness';  
    stockTable.rows[4].cells[1].innerHTML = 'Defence +8';    
    stockTable.rows[4].cells[2].innerHTML = '88 gold';    
    stockTable.rows[5].cells[0].innerHTML = 'Studded Legs'; 
    stockTable.rows[5].cells[1].innerHTML = 'Defence +8';    
    stockTable.rows[5].cells[2].innerHTML = '84 gold'; 
    stockTable.rows[6].cells[0].innerHTML = 'Studded Gloves';  
    stockTable.rows[6].cells[1].innerHTML = 'Accuracy +8';    
    stockTable.rows[6].cells[2].innerHTML = '72 gold';    
    stockTable.rows[7].cells[0].innerHTML = 'Hobnail Boots'; 
    stockTable.rows[7].cells[1].innerHTML = 'Evade +4';    
    stockTable.rows[7].cells[2].innerHTML = '41 gold';
    stockTable.rows[8].cells[0].innerHTML = 'Engraved Ring'; 
    stockTable.rows[8].cells[1].innerHTML = 'Luck +4';    
    stockTable.rows[8].cells[2].innerHTML = '60 gold';
    stockTable.rows[9].cells[0].innerHTML = 'Engraved Amulet'; 
    stockTable.rows[9].cells[1].innerHTML = 'Max Health +20';    
    stockTable.rows[9].cells[2].innerHTML = '64 gold';     
  }
  else if (shopTier ==="5") { 
    shop = [" Bronze Dagger", " Bronze Shield", " Bronze Helm", " Bronze Chainmail", " Bronze Chainlegs", " Bronze Gloves", " Bronze Boots", " Jade Ring", " Jade Amulet"];
    stockTable.rows[1].cells[0].innerHTML = 'Bronze Dagger'; 
    stockTable.rows[1].cells[1].innerHTML = 'Strength +10'; 
    stockTable.rows[1].cells[2].innerHTML = '97 gold'; 
    stockTable.rows[2].cells[0].innerHTML = 'Bronze Shield';
    stockTable.rows[2].cells[1].innerHTML = 'Evade +10';        
    stockTable.rows[2].cells[2].innerHTML = '100 gold';        
    stockTable.rows[3].cells[0].innerHTML = 'Bronze Helm';        
    stockTable.rows[3].cells[1].innerHTML = 'Defence +5';        
    stockTable.rows[3].cells[2].innerHTML = '55 gold';        
    stockTable.rows[4].cells[0].innerHTML = 'Bronze Chainmail';  
    stockTable.rows[4].cells[1].innerHTML = 'Defence +10';    
    stockTable.rows[4].cells[2].innerHTML = '112 gold';    
    stockTable.rows[5].cells[0].innerHTML = 'Bronze Chainlegs'; 
    stockTable.rows[5].cells[1].innerHTML = 'Defence +10';    
    stockTable.rows[5].cells[2].innerHTML = '108 gold'; 
    stockTable.rows[6].cells[0].innerHTML = 'Bronze Gloves';  
    stockTable.rows[6].cells[1].innerHTML = 'Accuracy +10';    
    stockTable.rows[6].cells[2].innerHTML = '97 gold';    
    stockTable.rows[7].cells[0].innerHTML = 'Bronze Boots'; 
    stockTable.rows[7].cells[1].innerHTML = 'Evade +5';    
    stockTable.rows[7].cells[2].innerHTML = '53 gold';
    stockTable.rows[8].cells[0].innerHTML = 'Jade Ring'; 
    stockTable.rows[8].cells[1].innerHTML = 'Luck +5';    
    stockTable.rows[8].cells[2].innerHTML = '75 gold';
    stockTable.rows[9].cells[0].innerHTML = 'Jade Amulet'; 
    stockTable.rows[9].cells[1].innerHTML = 'Max Health +25';    
    stockTable.rows[9].cells[2].innerHTML = '80 gold';     
  }  
  else if (shopTier ==="Food") {
    shop = [" Bread", " Cheese", " Ham", " Stew"];
    stockTable.rows[1].cells[0].innerHTML = 'Crust of Bread'; 
    stockTable.rows[1].cells[1].innerHTML = 'Health +3, Energy +1';    
    stockTable.rows[1].cells[2].innerHTML = '9 gold';     
    stockTable.rows[2].cells[0].innerHTML = 'Piece of Cheese'; 
    stockTable.rows[2].cells[1].innerHTML = 'Health +5, Energy +2';    
    stockTable.rows[2].cells[2].innerHTML = '15 gold';     
    stockTable.rows[3].cells[0].innerHTML = 'Leg of Ham'; 
    stockTable.rows[3].cells[1].innerHTML = 'Health +8, Energy +3';    
    stockTable.rows[3].cells[2].innerHTML = '29 gold';     
    stockTable.rows[4].cells[0].innerHTML = 'Hot Stew'; 
    stockTable.rows[4].cells[1].innerHTML = 'Health +9, Energy +5';    
    stockTable.rows[4].cells[2].innerHTML = '43 gold'; 
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
      case " Wooden Sword": if (this.gold >= 14) {
        this.gold -= 14;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Wooden Shield": if (this.gold >= 15) {
        this.gold -= 15;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Cloth Hat": if (this.gold >= 8) {
        this.gold -= 8;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Cloth Shirt": if (this.gold >= 18) {
        this.gold -= 18;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Cloth Legs": if (this.gold >= 16) {
        this.gold -= 16;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Cloth Gloves": if (this.gold >= 15) {
        this.gold -= 15;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Cloth Boots": if (this.gold >= 8) {
        this.gold -= 8;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Worn Ring": if (this.gold >= 12) {
        this.gold -= 12;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Worn Amulet": if (this.gold >= 13) {
        this.gold -= 13;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bread": if (this.gold >= 9) {
        this.gold -= 9;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;      
      case " Truncheon": if (this.gold >= 30) {
        this.gold -= 30;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Hardwood Shield": if (this.gold >= 32) {
        this.gold -= 32;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Leather Hat": if (this.gold >= 19) {
        this.gold -= 19;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Leather Shirt": if (this.gold >= 38) {
        this.gold -= 38;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Leather Legs": if (this.gold >= 35) {
        this.gold -= 35;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Leather Gloves": if (this.gold >= 30) {
        this.gold -= 30;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Leather Boots": if (this.gold >= 17) {
        this.gold -= 17;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Tarnished Ring": if (this.gold >= 25) {
        this.gold -= 25;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break; 
      case " Tarnished Amulet": if (this.gold >= 26) {
        this.gold -= 26;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;      
      case " Cheese": if (this.gold >= 15) {
        this.gold -= 15;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;      
      case " Bone Club": if (this.gold >= 50) {
        this.gold -= 50;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Reinforced Shield": if (this.gold >= 52) {
        this.gold -= 52;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bone Helm": if (this.gold >= 31) {
        this.gold -= 31;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bone Chestplate": if (this.gold >= 62) {
        this.gold -= 62;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Hard Leather Legs": if (this.gold >= 57) {
        this.gold -= 57;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Hard Leather Mitts": if (this.gold >= 50) {
        this.gold -= 50;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Hard Leather Boots": if (this.gold >= 28) {
        this.gold -= 28;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Shiny Ring": if (this.gold >= 42) {
        this.gold -= 42;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break; 
      case " Shiny Amulet": if (this.gold >= 44) {
        this.gold -= 44;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;      
      case " Ham": if (this.gold >= 29) {
        this.gold -= 29;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;  
      case " Hatchet": if (this.gold >= 72) {
        this.gold -= 72;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Kite Shield": if (this.gold >= 75) {
        this.gold -= 75;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Tin Helm": if (this.gold >= 43) {
        this.gold -= 43;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Studded Harness": if (this.gold >= 88) {
        this.gold -= 88;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Studded Legs": if (this.gold >= 84) {
        this.gold -= 84;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Studded Gloves": if (this.gold >= 72) {
        this.gold -= 72;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Hobnail Boots": if (this.gold >= 41) {
        this.gold -= 41;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Engraved Ring": if (this.gold >= 60) {
        this.gold -= 60;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break; 
      case " Engraved Amulet": if (this.gold >= 64) {
        this.gold -= 64;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;      
      case " Stew": if (this.gold >= 43) {
        this.gold -= 43;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;  
      case " Bronze Dagger": if (this.gold >= 97) {
        this.gold -= 97;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bronze Shield": if (this.gold >= 100) {
        this.gold -= 100;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bronze Helm": if (this.gold >= 55) {
        this.gold -= 55;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bronze Chainmail": if (this.gold >= 112) {
        this.gold -= 112;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;    
      case " Bronze Chainlegs": if (this.gold >= 108) {
        this.gold -= 108;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bronze Gloves": if (this.gold >= 97) {
        this.gold -= 97;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Bronze Boots": if (this.gold >= 53) {
        this.gold -= 53;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Jade Ring": if (this.gold >= 75) {
        this.gold -= 75;
        this.equipment[this.equipment.length] = item;
      }
      else {
        result.innerHTML = "You don't have enough gold to buy that.";
      }
      break;
      case " Jade Amulet": if (this.gold >= 80) {
        this.gold -= 80;
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
  this.legDef = 0;   
  this.helmDef = 0;
  this.shieldDodge = 0;
  this.bootDodge = 0;
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
  this.legs = "None";
  this.gloves = "None";
  this.boots = "None"; 
  this.ring = "None";
  this.amulet = "None";  
  this.points = 2;
  this.gold = 10;
  this.equipment = [];
  this.energy = 10;
  this.maxEnergy = 10;
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
