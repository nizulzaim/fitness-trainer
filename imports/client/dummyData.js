let datas = [
    {
        id: 1,
        "title": "Chickenpox",
        "info": "A viral illness characterised by a very itchy red rash, is one of the most common infectious diseases of childhood. It is usually mild in children but there is a risk of serious complications",
        "image": "/img/l.jpg",
        "sympthom": [
            "Fever",
            "Loss of appetite",
            "Headache",
            "Tiredness and a general feeling of being unwell (malaise)",
        ],
        "firstAid": [
            "Keep yourself or your child at home until all of the blisters have burst and crusted over.",
            "Vaccine is the best way to prevent chickenpox",
            "A cool bath with added baking soda, uncooked oatmeal or colloidal oatmeal — a finely ground oatmeal that is made for soaking.",
            "A soft, bland diet if chickenpox sores develop in the mouth.",
        ]
    },
    {
        id: 2,
        "title": "Diarrhea",
        "info": "Diarrhea is an increase in the frequency of bowel movements or a decrease in the form of stool (greaterlooseness of stool). Although changes in frequency of bowel movements and looseness of stoolscan vary independently of each other, changes often occur in both.",
        "image": "/img/k.jpg",
        "sympthom": [
            "Stomach pain",
            "Abdominal cramps",
            "Bloating",
            "Thirst",
            "Weight loss",
        ],
        "firstAid": [
            "Drinking more fluids",
            "Vaccine is the best way to prevent chickenpox",
            "Eat foods high in soluble fiber to help thicken the stool.",
            "Consume high-potassium foods and liquids.",
            "Oral rehydration solution/salts (ORS) - this is water that contains salt and glucose. It is absorbed by the small intestine to replace the water and electrolytes lost in the stool."
        ]
    }, {
        id: 3,
        title: "Infant Jaundice",
        info: "Infant jaundice, also known as physiological jaundice, is a condition in which the skin, and sometimes the sclerae (the white part of the eye), of the baby appear yellow.",
        "image": "/img/k.jpg",
        "sympthom": [
            "Excess bilirubin in a newborn causes the yellowish or jaundiced colour of the skin and the eyes",
            "Drowsiness",
            "Itchy skin",
            "Pale stools - breastfed babies should have greenish-yellow tools, while those of bottle fed babies should be a greenish-mustard color.",
            "Dark urine - a newborn's urine should be colorless.",
        ],
        "firstAid": [
            "More-frequent feedings",
            "Supplemental feedings",
            "Eat foods high in soluble fiber to help thicken the stool.",
            "Consume high-potassium foods and liquids.",
            "Oral rehydration solution/salts (ORS) - this is water that contains salt and glucose. It is absorbed by the small intestine to replace the water and electrolytes lost in the stool."
        ],
        "prevention": [
            "The best prevention of infant jaundice is adequate feeding.",
            "Breast-fed infants should have eight to 12 feedings a day for the first several days of life",
        ]
    }, {
        id: 4,
        title: "Light Injury",
        "image": "/img/s.jpg",
        "info": "Burns are one of the most common household injuries, especially among children. The term “burn” means more than the burning sensation associated with this injury. Burns are characterized by severe skin damage that causes the affected skin cells to die.",
        "sympthom": [
            "Skin reddening",
            "Peelings",
            "Blister",
            "Charred skin",
            "Swelling",
        ],
        firstAid: [
            `Cool the burns that occur with normal water for about 20-30 minutes <span style="color:yellow">Be sure not to use ice</span>`,
            `Get rid of any clothing or accessories that cover the burnedskin`,
            `Try to put a burn patient in an upright position, if the face or eyes burns. For upright sitting position will reduce the swelling.`,
            `Make sure the person who suffered burns still feel warm. Could use a blanket to cover herself, but not to scratch the skin burns. Burns can be covered with plastic or sterile bandage.`
        ]
    }
];

export default datas;

export const DataById = function(id) {
    let res = undefined;
    let ds = datas;
    ds.forEach((item) => {
        if (!res) res =  item.id === id ? item : undefined;
    });

    return res;
};