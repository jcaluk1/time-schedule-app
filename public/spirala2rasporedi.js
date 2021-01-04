const firstDiv = document.getElementById("first");
const secondDiv = document.getElementById("second");

let message1;
let message2;

const days1 = ["Ponedjeljak", "Utorak", "Srijeda", "Cetvratk", "Petak"];
const days2 = ["Ponedjeljak", "Utorak", "Srijeda"];

iscrtajRaspored(firstDiv, days1, 8, 20);
message1 = dodajAktivnost(firstDiv, "MUR", "predavanje", 5, 13, days1[0]); // hour is wrong
alert(message1);

dodajAktivnost(firstDiv, "MUR", "predavanje", 8, 13, days1[0]);
dodajAktivnost(firstDiv, "TP", "predavanje", 13, 15, days1[0]);
dodajAktivnost(firstDiv, "MUR", "predavanje", 15, 20, days1[0]);
dodajAktivnost(firstDiv, "UUP", "vjezbe", 8.5, 11.5, days1[1]);
dodajAktivnost(firstDiv, "WT", "vjezbe", 13.5, 14.5, days1[1]);

message1 = dodajAktivnost(firstDiv, "WT", "vjezbe", 13, 15, days1[1]); // overlap
alert(message1);

iscrtajRaspored(secondDiv, days2, 9, 19);
dodajAktivnost(secondDiv, "WT", "predavanje", 9, 12, days1[0]);
dodajAktivnost(secondDiv, "WT", "vježbe", 12, 13.5, days1[0]);
dodajAktivnost(secondDiv, "RMA", "predavanje", 14, 17, days1[0]);
dodajAktivnost(secondDiv, "RMA", "vježbe", 12.5, 14, days1[1]);
dodajAktivnost(secondDiv, "DM", "tutorijal", 14, 16, days1[1]);
dodajAktivnost(secondDiv, "DM", "predavanje", 16, 19, days1[1]);
dodajAktivnost(secondDiv, "OI", "predavanje", 12, 15, days1[2]);

message2 = dodajAktivnost(secondDiv, "WT", "vjezbe", 13, 15, "četvrtak"); // non existing day
alert(message2);
