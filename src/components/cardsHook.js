import React, { useEffect, useState } from 'react';
import axios from "axios";

import useProfileData from "./profileHook";
import useFilterData from "./filterHook";


const useWaifuCardsData = (userID) => {
    
    const [waifuCardsData, setWaifuCardsData] = useState();

    // const [profilData, setProfilData] = useProfileData(userID);
    const [filterData, setFilterData] = useFilterData();

    useEffect(() => {
        if (!waifuCardsData) {
        async function fetchUsers() {
            console.log("Pobiera dane z api - karty");
            axios.post(`https://api.sanakan.pl/api/waifu/user/${userID}/cards/0/100`, filterData).then((res)=> {
                const newWaifuCardsData = res.data;
                setWaifuCardsData(newWaifuCardsData)
            })
        }
    
        fetchUsers();
        }
      }, []);

    

    return [waifuCardsData, setWaifuCardsData];
}

export default useWaifuCardsData;