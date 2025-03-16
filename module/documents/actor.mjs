/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class ReconQuestActor extends Actor {
  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the actor source data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.reconquest || {};

    // Make separate methods for each Actor type (character, npc, etc.) to keep
    // things organized.
    this._prepareCharacterData(actorData);
    this._prepareNpcData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;

    // Loop through ability scores, and add their modifiers to our sheet output.
    for (let [key, ability] of Object.entries(systemData.abilities)) {
      // Calculate the modifier using d20 rules.
      ability.mod = Math.floor((ability.value - 10) / 2);
      //str ov me
      switch (true) {
        case (ability.value >= 21):
          ability.ovme = 5;
          break;
        case (ability.value === 20):
          ability.ovme = 4;
          break;
        case (ability.value >= 18 && ability.value <= 19):
          ability.ovme = 3;
          break;
        case (ability.value >= 16 && ability.value <= 17):
          ability.ovme = 2;
          break;
        case (ability.value >= 13 && ability.value <= 15):
          ability.ovme = 1;
          break;
        case (ability.value >= 9 && ability.value <= 12):
          ability.ovme = 0;
          break;
        case (ability.value >= 6 && ability.value <= 8):
          ability.ovme = -1;
          break;
        case (ability.value >= 4 && ability.value <= 5):
          ability.ovme = -2;
          break;
        case (ability.value >= 2 && ability.value <= 3):
          ability.ovme = -3;
          break;
        case (ability.value === 1):
          ability.ovme = -4;
          break;
        default:
          ability.ovme = 0;
      }

      //str carrycapacity & maximumcapacity
      switch (true) {
        case (ability.value >= 21):
          ability.carrycapacity = 105;
          ability.maximumcapacity = 210;
          break;
        case (ability.value < 21):
          ability.carrycapacity = ability.value * 5;
          ability.maximumcapacity = ability.value * 10;
          break;
        default:
          ability.carrycapacity = 0;
      }

      // dex ovmi
      switch (true) {
        case (ability.value > 21):
          ability.ovmi = 5;
          break;
        case (ability.value === 20):
          ability.ovmi = 4;
          break;
        case (ability.value >= 18 && ability.value <= 19):
          ability.ovmi = 3;
          break;
        case (ability.value >= 16 && ability.value <= 17):
          ability.ovmi = 2;
          break;
        case (ability.value >= 13 && ability.value <= 15):
          ability.ovmi = 1;
          break;
        case (ability.value >= 9 && ability.value <= 12):
          ability.ovmi = 0;
          break;
        case (ability.value >= 6 && ability.value <= 8):
          ability.ovmi = -1;
          break;
        case (ability.value >= 4 && ability.value <= 5):
          ability.ovmi = -2;
          break;
        case (ability.value >= 2 && ability.value <= 3):
          ability.ovmi = -3;
          break;
        case (ability.value === 1):
          ability.ovmi = -4;
          break;
        default:
          ability.ovmi = 0;
      }
      // dex dv & initiative
      switch (true) {
        case (ability.value > 21):
          ability.dv = 5;
          ability.initiative = 5;
          break;
        case (ability.value === 20):
          ability.dv = 4;
          ability.initiative = 4;
          break;
        case (ability.value >= 18 && ability.value <= 19):
          ability.dv = 3;
          ability.initiative = 3;
          break;
        case (ability.value >= 16 && ability.value <= 17):
          ability.dv = 2;
          ability.initiative = 2;
          break;
        case (ability.value >= 13 && ability.value <= 15):
          ability.dv = 1;
          ability.initiative = 1;
          break;
        case (ability.value >= 9 && ability.value <= 12):
          ability.dv = 1;
          ability.initiative = 1;
          break;
        case (ability.value < 8):
          ability.dv = 0;
          ability.initiative = 0;
          break;
        default:
          ability.dv = 0;
          ability.initiative = 0;
      }
      // dex climbingrate
      switch (true) {
        case (ability.value > 21):
          ability.climbingrate = 20;
          break;
        case (ability.value === 20):
          ability.climbingrate = 20;
          break;
        case (ability.value >= 16 && ability.value <= 19):
          ability.climbingrate = 15;
          break;
        case (ability.value >= 6 && ability.value <= 15):
          ability.climbingrate = 10;
          break;
        case (ability.value >= 2 && ability.value <= 5):
          ability.climbingrate = 5;
          break;
        case (ability.value === 1):
          ability.climbingrate = 0;
          break;
        default:
          ability.climbingrate = 0;
      }
      // con swimmingrate 
      switch (true) {
        case (ability.value > 20):
          ability.swimmingrate = 20;
          break;
        case (ability.value >= 16 && ability.value <= 19):
          ability.swimmingrate = 15;
          break;
        case (ability.value >= 6 && ability.value <= 15):
          ability.swimmingrate = 10;
          break;
        case (ability.value >= 2 && ability.value <= 5):
          ability.swimmingrate = 5;
          break;
        case (ability.value === 1):
          ability.swimmingrate = 0;
          break;
        default:
          ability.swimmingrate = 0;
      }
      // con holdbreath
      switch (true) {
        case (ability.value > 20):
          ability.holdbreath = 11;
          break;
        case (ability.value === 20):
          ability.holdbreath = 10;
          break;
        case (ability.value >= 18 && ability.value <= 19):
          ability.holdbreath = 9;
          break;
        case (ability.value >= 16 && ability.value <= 17):
          ability.holdbreath = 8;
          break;
        case (ability.value >= 13 && ability.value <= 15):
          ability.holdbreath = 7;
          break;
        case (ability.value >= 9 && ability.value <= 12):
          ability.holdbreath = 6;
          break;
        case (ability.value >= 6 && ability.value <= 8):
          ability.holdbreath = 5;
          break;
        case (ability.value >= 4 && ability.value <= 5):
          ability.holdbreath = 4;
          break;
        case (ability.value >= 2 && ability.value <= 3):
          ability.holdbreath = 3;
          break;
        case (ability.value === 1):
          ability.holdbreath = 2;
          break;
        default:
          ability.holdbreath = 0;
      }
      //int dailyspells
      switch (true) {
        case (ability.value > 21):
          ability.dailyspells = 5;
          break;
        case (ability.value === 20):
          ability.dailyspells = 4;
          break;
        case (ability.value >= 18 && ability.value <= 19):
          ability.dailyspells = 3;
          break;
        case (ability.value >= 16 && ability.value <= 17):
          ability.dailyspells = 2;
          break;
        case (ability.value >= 13 && ability.value <= 15):
          ability.dailyspells = 1;
          break;
        case (ability.value <= 12):
          ability.dailyspells = 0;
          break;
        default:
          ability.dailyspells = 0;
      }
      //int extralanguages
      switch (true) {
        case (ability.value > 21):
          ability.extralanguages = 3;
          break;
        case (ability.value >= 18 && ability.value <= 20):
          ability.extralanguages = 2;
          break;
        case (ability.value >= 13 && ability.value <= 17):
          ability.extralanguages = 1;
          break;
        case (ability.value <= 12):
          ability.extralanguages = 0;
          break;
        default:
          ability.extralanguages = 0;
      }
      
      //cha maxretainers & hirelings
      ability.maxretainers = Math.ceil(ability.value / 2);
      ability.maxhirelings = ability.value;
    }
    

   
  }

  /**
   * Prepare NPC type specific data.
   */
  _prepareNpcData(actorData) {
    if (actorData.type !== 'npc') return;

    // Make modifications to data here. For example:
    const systemData = actorData.system;
    systemData.xp = systemData.cr * systemData.cr * 100;
  }

  /**
   * Override getRollData() that's supplied to rolls.
   */
  getRollData() {
    // Starts off by populating the roll data with a shallow copy of `this.system`
    const data = { ...this.system };

    // Prepare character roll data.
    this._getCharacterRollData(data);
    this._getNpcRollData(data);

    return data;
  }

  /**
   * Prepare character roll data.
   */
  _getCharacterRollData(data) {
    if (this.type !== 'character') return;

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (data.abilities) {
      for (let [k, v] of Object.entries(data.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    // Add level for easier access, or fall back to 0.
    //disabled, breaks charsheet for some reason
    /*   if (data.attributes.level) {
         data.lvl = data.attributes.level.value ?? 0;
       }
       else data.lvl = 1;*/
  }

  /**
   * Prepare NPC roll data.
   */
  _getNpcRollData(data) {
    if (this.type !== 'npc') return;

    // Process additional NPC data here.
  }
}
