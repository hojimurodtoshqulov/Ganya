import AddModul from "@/components/dashboard/add_modul";
import Dars from "@/components/dashboard/dars";
import DarsList from "@/components/dashboard/dars-list";
import Banner from "@/components/dashboard/kontent";
import Sharhlar from "@/components/dashboard/Отзывы";
import Info from "@/components/shared/info/info";
import Stati from "@/components/shared/stati/stati";
import Tariflar from "@/components/shared/tariflar/tariflar";
const data = {
    title: "О нас",
    text: 'Платформа "Академия осознанного родительства" создана Ганей Усмановой – мамой, предпринимателем и инфлюенсером с реальным опытом воспитания двух детей. На платформе вы сможете получить знания и опыт, которые собраны не только на личном опыте воспитания двоих детей, но и подтверждены последними научными исследованиями.',
    tags: ["инфлуэнсер", "бизнес-леди"]
}
const data1 = {
    title: 'Курс “Прикорм без проблем”',
    text: 'В разработке курса "Прикорм без проблем" я применила не только свой опыт, но и мировые научные подходы, обращаясь к знаниям и методикам, проверенным временем и научным сообществом. Для создания курса были привлечены выдающиеся эксперты в области ухода за детьми и педиатрии, каждый из которых внес свой вклад в формирование курса, чтобы предоставить вам наиболее ценные и актуальные знания. Это стало возможным благодаря моей вере в то, что гармоничное развитие ребенка начинается с осознанного подхода к прикорму, подкрепленного научными данными и лучшими практиками.'
}

function Test() {
    return <>
        <div className="min-h-screen pt-[100px]">
            <Sharhlar />
            <Banner/>
        </div>
        {/* <Info {...data} />
        <Info {...data1} sort={true} />
        <Tariflar />
        <Stati />
        <Dars />
        <DarsList isActive={true} />
        <DarsList /> */}


    </>
}

export default Test;