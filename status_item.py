import gi
import subprocess
import psutil

gi.require_version('Gtk', '3.0')
gi.require_version('AppIndicator3', '0.1')
from gi.repository import Gtk, AppIndicator3

launch_args = ['/home/devin/Documents/SlackMod/venv/bin/python', '/home/devin/Documents/SlackMod/src/main.py']

class AppIndicator:

    def __init__(self):
        self.process = None  # Process placeholder

        self.indicator = AppIndicator3.Indicator.new(
            "simple-app-launcher",
            "dialog-information-symbolic",
            AppIndicator3.IndicatorCategory.APPLICATION_STATUS
        )
        self.indicator.set_status(AppIndicator3.IndicatorStatus.ACTIVE)
        
        self.menu = Gtk.Menu()
        self.build_menu()

        self.indicator.set_menu(self.menu)

        # launch app on startup
        self.launch_app()
        
        Gtk.main()

    def kill_slack_processes(self):
        killed_procs = []
        for proc in psutil.process_iter(['pid', 'name']):
            if proc.info['name'] == 'slack':
                proc.kill()
                killed_procs.append(proc)
   
        gone, alive = psutil.wait_procs(killed_procs, timeout=3, callback=self.on_terminate)
        for p in alive:
            p.kill()
   
    def on_terminate(self, proc):
        pass

    def build_menu(self):
        # Relaunch app menu item
        item_relaunch = Gtk.MenuItem(label='Relaunch Slack')
        item_relaunch.connect('activate', self.relaunch_app)
        self.menu.append(item_relaunch)

        # Quit menu item
        item_quit = Gtk.MenuItem(label='Quit')
        item_quit.connect('activate', lambda q: self.quit())
        self.menu.append(item_quit)

        self.menu.show_all()

    def quit(self):
        self.kill_slack_processes()
        Gtk.main_quit()

    def launch_app(self, *args):
        if not self.process:  # Check if process is not already running
            self.process = subprocess.Popen(launch_args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    def relaunch_app(self, *args):
        if self.process:
            self.process.terminate()  # Kill the existing process
            self.process.wait()       # Wait for the process to terminate
            self.process = None
        self.kill_slack_processes()
        self.launch_app()  # Launch the app again

if __name__ == "__main__":
    AppIndicator()
