import React, { useEffect, useState } from 'react';
import axios from "axios";

const useProfilData = (userID) => {
    const [profilData, setProfilData] = useState()

    const [profilDataLoaded, setProfilDataLoaded] = useState(false)

    useEffect(() => {
        if(!profilDataLoaded) {
        setProfilDataLoaded(true)
        async function fetchUsers() {
            console.log("Pobiera dane z api - profil");
            await axios.get(`https://api.sanakan.pl/api/waifu/user/${userID}/profile`).then((res)=> {
                const newProfilData = res.data;
                setProfilData(newProfilData)
            })
        }
        fetchUsers();
        }
      }, []);

    

    return [profilData, setProfilData];
}

export default useProfilData;