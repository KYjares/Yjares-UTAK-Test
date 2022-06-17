import app from "firebase/compat/app";
import "firebase/compat/database";

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	databaseURL:
		"https://utak-react-test-50fbb-default-rtdb.asia-southeast1.firebasedatabase.app/",
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
	constructor() {
		app.initializeApp(config);
		this.db = app.database();
	}
	//API routes
	menu = () => this.db.ref("menu");
	modifyMenuItem = (menuItemId) => this.db.ref(`menu/${menuItemId}`);
}

export default Firebase;
