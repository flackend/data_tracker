# Data Tracker

Very quick and dirty at this point. Will eventually make this a little more polished so I can track more than one data point. Make it a bit more agnostic.

- Make call to Blynk endpoint on interval and store value and date 
- Serve latest data point
- Serve up historical data 📈

## Install

Followed [this StackOverflow answer](https://stackoverflow.com/a/42126391/1165832) to setup a service.

Clone repo to home directory (**/home/pi**) and create symlink to **/etc/systemd/system/**.

```bash
ln -s /home/pi/data_tracker/data_tracker.service /etc/systemd/system/
```

Setup MySQL database and user.

Copy **.env.example** to a new **.env**.

Install NPM dependencies.

Make sure **start.sh** has execute permissions.