import React, { useEffect, useState } from 'react';

const useFilterData = () => {
    const filter = {
        orderBy: "id", //id, idDes, name, nameDes, rarity, rarityDes, title, titleDes, health, healthDes, atack, atackDes, defence, defenceDes
        includeTags: [],
        excludeTags: [],
        searchText: null
    };

    const [filterData, setFilterData] = useState(filter);

    return [filterData, setFilterData];
}

export default useFilterData;