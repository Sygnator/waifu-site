const sortProfileGallery = (gallery, galleryOrder) => {
    // Sort gallery by galleryOrder
    let newGallery = [...gallery];

    if (galleryOrder.length) {
        galleryOrder.reverse().forEach(id => {
            if (id !== 0) {
                const index = newGallery.findIndex(card => card.id === id);
                if (index !== -1) {
                    newGallery.unshift(newGallery.splice(index, 1)[0]);
                }
            }
        });

        return newGallery
    } else {
        return gallery
    }
}

export default sortProfileGallery