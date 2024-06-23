import { app, BrowserWindow } from "electron";
import path from "node:path";
import { spawn } from "child_process";
import express from "express";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");

const serverapp = express();
serverapp.use(express.static(process.resourcesPath));
serverapp.get("*", (req, res) => {
	res.sendFile(__filename);
	console.log(req.path);
});

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
	win = new BrowserWindow({
		icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	// Test active push message to Renderer-process.
	win.webContents.on("did-finish-load", () => {
		win?.webContents.send("main-process-message", new Date().toLocaleString());
	});

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL);
	} else {
		// win.loadFile('dist/index.html')
		win.loadFile(path.join(process.env.DIST, "index.html"));
	}
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		win = null;
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.on("ready", () => {
	const jarPath = path.join(process.resourcesPath, "/itms-0.0.1-SNAPSHOT.jar");
	console.log(jarPath);
	console.log(process.resourcesPath);

	const javaProcess = spawn("java", ["-jar", jarPath]);

	javaProcess.stdout.on("data", (data) => {
		console.log(`stdout: ${data}`);
	});

	javaProcess.stderr.on("data", (data) => {
		console.error(`stderr: ${data}`);
	});

	javaProcess.on("close", (code) => {
		console.log(`Java process exited with code ${code}`);
	});

	serverapp.listen(3000, () => {
		console.log("Server started on http://localhost:3000");
		createWindow();
	});
});
