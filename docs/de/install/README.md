# Installation auf dem Raspberry Pi 3

Lumi befindet sich noch in einer sehr frühen Entwicklungsphase. Diese Anleitung
kann sich daher noch häufig ändern. ​Sollten bei der Installation Fehler auftreten, so kannst du [hier](TROUBLE.md) nachlesen oder uns [kontaktieren](../CONTACT.md).

## Hardware & Betriebssystem

Lumi ist für den Einsatz auf einem
[Raspberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)
mit dem Betriebssystem
[Raspbian Stretch](https://www.raspberrypi.org/downloads/raspbian/) konzipiert.

## Vorbereitung

Schreibe das neueste Raspbian Image mit [Etcher](https://etcher.io) oder einem ähnlichen Programm auf die SD Karte deines Raspberry Pi. Dabei werden alle Daten auf der SD Karte gelöscht. Falls du dabei Hilfe benötigst emfpielt es sich die offizielle [Anleitung](https://www.raspberrypi.org/documentation/installation/installing-images/README.md) oder Youtube Videos durchzusehen. 
Hinweis: Für den Download werden "NOOBS" und "Raspbian" angeboten. Für Lumi benötigst du nur Raspbian. Bei der NOOBs Variante müsste man einen zusätzlichen Schritt durchführen, nämlich das Raspberry Pi mit Tastatur, Maus und Bildschirm hochfahren und dann Raspbian installieren.

Bevor du die SD Karte in dein Raspberry Pi steckst, musst du eine Datei names "ssh" (keine Dateiendung) direkt im übergeordneten Ordner deiner SD Karte erstellen. Nur so kannst du dich später per ssh verbinden. Alternativ kannst du natürlich auch dein Raspberry Pi mit einer Tastatur, Maus und einem Bildschirm verbinden und dort die SSH Option aktivieren. [hier](https://www.raspberrypi.org/documentation/remote-access/ssh/README.md) sind diese beiden Möglichkeiten nochmals zusammengesfasst. 



## Lumi-Installation 

Im ersten Schritt muss sich per ssh mit dem Raspberry Pi verbunden werden. Dazu muss sich der Raspberry Pi im selben Netzwerk befinden. Da Lumi die WLAN Schnittstelle zum erstellen des eigenen WLANs benötigt musst du dein Raspberry Pi per LAN Kabel an den Router deines Netzwerks anschließen und anschließend die IP Adresse herausfinden.
Nun kannst du dich mit deinem Raspberry Pi über ssh verbinden. Mac User können folgende Zeile direkt im Terminal eingeben:

```
ssh pi@<ip des pi>
```

![lumi_ssh](./img/lumi_ssh.gif)

**pi** ist dabei der default-Benutzername und das default-Passwort lautet **raspberry**. Windows Nutzer verwenden am besten [Putty](https://www.putty.org) und fahren dann gleichermaßen fort (Anleitung [hier](https://www.raspberrypi.org/documentation/remote-access/ssh/windows.md)). Wenn du mit dem Raspberry Pi über ssh verbunden bist, musst du nur noch

```
sudo curl get.lumi.education | sh
```

eingeben und Lumi wird installiert.
[Hier](../lumi/FIRST-STEPS.md) geht es weiter zu den ersten Schritten.
