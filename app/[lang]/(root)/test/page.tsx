import Info from "@/components/shared/info/info";
const data = {
    title: "О нас",
    text: 'Платформа "Академия осознанного родительства" создана Ганей Усмановой – мамой, предпринимателем и инфлюенсером с реальным опытом воспитания двух детей. На платформе вы сможете получить знания и опыт, которые собраны не только на личном опыте воспитания двоих детей, но и подтверждены последними научными исследованиями.',
    tags: ["инфлуэнсер", "бизнес-леди"],
    url: "https://s3-alpha-sig.figma.com/img/db87/1723/da0ba68c8dbb932b6231c009477db70f?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y1rZDKX45ptLSys5YWfGS73XjNBJwXpwlIEapaOOWyOrU9nJnx94Vv~wXdQnRiCgKxXiXnJZvH2GX~8Okug0CymPXASArCdRo3EsEx5efIHEQGaOLeRZXidGF7LelcHijLUmg6vZCTUA2ys0V1K6w~V5hfmN7momQVOLZBdI3fjPQTlNd67fbT4MybI0QsjSCopcOJGBG-spoTq~oUYYuefOG4wv~aacILE9fKwMPeM0cdmIaoXm2YteeS0Z7G5IGg0J3bJVkHWmDgPiTI8N-O7~C2CWzwM8J5FGU6mxWwWhfcq-NrCabpFwkKufeStxGhuA8OSQi5g3rvHrGa6QCg__"
}
const data1 = {
    title: 'Курс “Прикорм без проблем”',
    text: 'В разработке курса "Прикорм без проблем" я применила не только свой опыт, но и мировые научные подходы, обращаясь к знаниям и методикам, проверенным временем и научным сообществом. Для создания курса были привлечены выдающиеся эксперты в области ухода за детьми и педиатрии, каждый из которых внес свой вклад в формирование курса, чтобы предоставить вам наиболее ценные и актуальные знания. Это стало возможным благодаря моей вере в то, что гармоничное развитие ребенка начинается с осознанного подхода к прикорму, подкрепленного научными данными и лучшими практиками.',
    url: "https://s3-alpha-sig.figma.com/img/db87/1723/da0ba68c8dbb932b6231c009477db70f?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y1rZDKX45ptLSys5YWfGS73XjNBJwXpwlIEapaOOWyOrU9nJnx94Vv~wXdQnRiCgKxXiXnJZvH2GX~8Okug0CymPXASArCdRo3EsEx5efIHEQGaOLeRZXidGF7LelcHijLUmg6vZCTUA2ys0V1K6w~V5hfmN7momQVOLZBdI3fjPQTlNd67fbT4MybI0QsjSCopcOJGBG-spoTq~oUYYuefOG4wv~aacILE9fKwMPeM0cdmIaoXm2YteeS0Z7G5IGg0J3bJVkHWmDgPiTI8N-O7~C2CWzwM8J5FGU6mxWwWhfcq-NrCabpFwkKufeStxGhuA8OSQi5g3rvHrGa6QCg__"
}
function Test() {
    return <>
        <Info {...data} />
        <Info {...data1} sort={true} />
    </>
}

export default Test;

