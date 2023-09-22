import os
import signal
import platform
import psutil
from electron_inject import inject

def kill_slack_processes():
    print('Killing Slack Processes')
    killed_procs = []
    for proc in psutil.process_iter(['pid', 'name']):
        if proc.info['name'] == 'Slack':
            proc.kill()
            killed_procs.append(proc)

    gone, alive = psutil.wait_procs(killed_procs, timeout=3, callback=on_terminate)
    for p in alive:
        p.kill()

def on_terminate(proc):
    print(f"Process {proc} terminated with exit code {proc.returncode}")

def signal_handler(sig, frame):
    print('You pressed Ctrl+C!')
    kill_slack_processes()
    os._exit(0)


signal.signal(signal.SIGINT, signal_handler)

#print("python can't automatically kill slack in macos, please ctrl+q slack then press enter")
kill_slack_processes()

ERR_SLACK_NOT_FOUND =  "Could not find Slack install! Please:\n\t- install Slack\n\t- open a Github issue so I can support your install location\nPress Enter to exit."
slack_location = "/Applications/Slack.app/Contents/MacOS/Slack"  # default for MacOS

if platform.system() == "Windows":
    slack_location = "C:\\Users\\YourUserName\\AppData\\Local\\slack\\slack.exe"  # replace with actual path
elif platform.system() == "Linux":
    slack_location = "/usr/bin/slack"  # replace with actual path

if not os.path.exists(slack_location):
    input(ERR_SLACK_NOT_FOUND)
    os._exit(0)

# scripts we will inject are added to this array
scripts = []
cwd = os.path.dirname(os.path.abspath(__file__))

scripts.append(f"{cwd}/../dist/injected-script.js")

print(f"\ncalling electron main with args:")
print(f"\tslack location:{slack_location}")
print(f"\tscripts:")
for script in scripts: print(f"\t\t{script}")

inject(slack_location, devtools=False, timeout=60000, scripts=scripts)

