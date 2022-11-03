import Main from "./main";
import React, { useEffect } from "react";
import ApiManager from "./Api/ApiManager";

function App() {
  	// set fetch and set api config object on app mount
  	useEffect(() => {
		const fetchConfig = async () => {
			let res = await ApiManager.router.tmdbConfig.fetchTmdbConfig()
			console.log(res)
			if (res.isSuccess) {
				await ApiManager.setTmdbConfig(res.data)
			}
		}
    
    	fetchConfig()
  	}, [])
  
  	return (
    	<div className="App">
      		<Main />
    	</div>
  	);
}

export default App;

