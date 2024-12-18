"use strict";
// ---------- Частина 1: Визначення типів та інтерфейсів ----------
var HeroType;
(function (HeroType) {
    HeroType["Warrior"] = "WARRIOR";
    HeroType["Mage"] = "MAGE";
    HeroType["Archer"] = "ARCHER";
})(HeroType || (HeroType = {}));
var AttackType;
(function (AttackType) {
    AttackType["Physical"] = "PHYSICAL";
    AttackType["Magical"] = "MAGICAL";
    AttackType["Ranged"] = "RANGED";
})(AttackType || (AttackType = {}));
// ---------- Частина 2: Функції ----------
function createHero(name, type) {
    let baseStats;
    let attackType;
    // Встановлюємо характеристики залежно від типу героя
    switch (type) {
        case HeroType.Warrior:
            baseStats = { health: 120, attack: 15, defense: 10, speed: 5 };
            attackType = AttackType.Physical;
            break;
        case HeroType.Mage:
            baseStats = { health: 80, attack: 20, defense: 5, speed: 10 };
            attackType = AttackType.Magical;
            break;
        case HeroType.Archer:
            baseStats = { health: 100, attack: 18, defense: 8, speed: 15 };
            attackType = AttackType.Ranged;
            break;
    }
    return {
        id: Math.floor(Math.random() * 100000),
        name: name,
        type: type,
        attackType: attackType,
        stats: baseStats,
        isAlive: true
    };
}
// Функція розрахунку пошкодження
function calculateDamage(attacker, defender) {
    // Базовий розрахунок пошкодження
    let baseDamage = attacker.stats.attack - defender.stats.defense;
    if (baseDamage < 1) {
        baseDamage = 1;
    }
    // Критичний удар (20% шанс)
    const isCritical = Math.random() < 0.2;
    const finalDamage = isCritical ? baseDamage * 2 : baseDamage;
    // Зменшуємо здоров'я захисника
    let remainingHealth = defender.stats.health - finalDamage;
    if (remainingHealth < 0) {
        remainingHealth = 0;
    }
    return {
        damage: finalDamage,
        isCritical: isCritical,
        remainingHealth: remainingHealth
    };
}
// Generic функція для пошуку героя в масиві
function findHeroByProperty(heroes, property, value) {
    return heroes.find((hero) => hero[property] === value);
}
// Функція проведення раунду бою між двома героями
function battleRound(hero1, hero2) {
    if (!hero1.isAlive || !hero2.isAlive) {
        return "Бій не може бути проведений, один з героїв уже мертвий.";
    }
    // Визначаємо, хто атакує першим за швидкістю
    const firstAttacker = hero1.stats.speed >= hero2.stats.speed ? hero1 : hero2;
    const secondAttacker = firstAttacker === hero1 ? hero2 : hero1;
    // Перший атака
    const firstAttackResult = calculateDamage(firstAttacker, secondAttacker);
    secondAttacker.stats.health = firstAttackResult.remainingHealth;
    if (secondAttacker.stats.health <= 0) {
        secondAttacker.isAlive = false;
        return `${firstAttacker.name} атакував(ла) ${secondAttacker.name}, завдавши ${firstAttackResult.damage} пошкоджень${firstAttackResult.isCritical ? " (критичний удар!)" : ""}. ${secondAttacker.name} загинув(ла).`;
    }
    // Якщо другий ще живий, він атакує у відповідь
    const secondAttackResult = calculateDamage(secondAttacker, firstAttacker);
    firstAttacker.stats.health = secondAttackResult.remainingHealth;
    if (firstAttacker.stats.health <= 0) {
        firstAttacker.isAlive = false;
        return `${firstAttacker.name} атакував(ла) ${secondAttacker.name}, завдавши ${firstAttackResult.damage} пошкоджень${firstAttackResult.isCritical ? " (критичний удар!)" : ""}.
${secondAttacker.name} атакував(ла) у відповідь ${firstAttacker.name}, завдавши ${secondAttackResult.damage} пошкоджень${secondAttackResult.isCritical ? " (критичний удар!)" : ""}.
${firstAttacker.name} загинув(ла).`;
    }
    return `${firstAttacker.name} атакував(ла) ${secondAttacker.name}, завдавши ${firstAttackResult.damage} пошкоджень${firstAttackResult.isCritical ? " (критичний удар!)" : ""}.
${secondAttacker.name} атакував(ла) у відповідь ${firstAttacker.name}, завдавши ${secondAttackResult.damage} пошкоджень${secondAttackResult.isCritical ? " (критичний удар!)" : ""}.
Обидва герої залишилися живими: ${firstAttacker.name} (${firstAttacker.stats.health} HP), ${secondAttacker.name} (${secondAttacker.stats.health} HP).`;
}
// ---------- Частина 3: Практичне застосування ----------
// Створити масив героїв
const heroes = [
    createHero("Орест", HeroType.Warrior),
    createHero("Альберіх", HeroType.Mage),
    createHero("Елейн", HeroType.Archer)
];
// Створюємо героїв для прикладу
const warrior = createHero("Дмитро", HeroType.Warrior);
const mage = createHero("Мерлін", HeroType.Mage);
const archer = createHero("Робін", HeroType.Archer);
// Додаємо створених героїв у масив
heroes.push(warrior, mage, archer);
// Демонструємо пошук героїв за різними властивостями
const foundByType = findHeroByProperty(heroes, "type", HeroType.Warrior);
const foundByName = findHeroByProperty(heroes, "name", "Мерлін");
// Проводимо кілька раундів бою між героями
console.log("----- Початок бою між Дмитром та Мерліном -----");
let roundResult = battleRound(warrior, mage);
console.log(roundResult);
if (warrior.isAlive && mage.isAlive) {
    roundResult = battleRound(warrior, mage);
    console.log(roundResult);
}
// Виведемо знайдених героїв
console.log("----- Результати пошуку -----");
console.log("Знайшли героя за типом (Warrior):", foundByType);
console.log("Знайшли героя за іменем (Мерлін):", foundByName);
// Виведемо список усіх героїв і їх стан
console.log("----- Список всіх героїв -----");
heroes.forEach(h => {
    console.log(`${h.name} (${h.type}): ${h.stats.health} HP, Живий: ${h.isAlive}`);
});
