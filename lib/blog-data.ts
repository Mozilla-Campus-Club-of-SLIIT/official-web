export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  tags: string[]
  imageUrl: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Web Development",
    excerpt: "A beginner's guide to modern web development technologies and practices.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "John Doe",
    date: "2024-03-15",
    tags: ["Web Development", "Beginners", "Tutorial"],
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "2",
    title: "Cyberwarfare: How does it impact everyday life?",
    excerpt:
      "Unlike traditional warfare where battles take place on a geographical plane, Cyberwarfare poses a significant threat on the digital realm.",
    content:
      "Simply defined, Cyberwarfare is the use of technology to penetrate and attack other nations’ computer systems and networks in an effort to cause damage or disrupt services. In today’s interconnected global society and with the advancements in technology, cyber warfare has sparked profound changes on how societies and its individuals function in their day-to-day lives. This article explores how cyberwarfare extends beyond traditional battlefields to have a lasting impact on many spheres of influence in everyday life." +
      "INTRODUCTION:" +
      "Unlike traditional warfare where battles take place on a geographical plane, Cyberwarfare poses a significant threat on the digital realm. Instead of typical targets like the military and government institutions, cyber-attacks target a plethora of organizations- from financial institutions to healthcare providers, from transportation bodies to infrastructure facilities. Its repercussions can have severe consequences for the fabric of daily life." +
      "ECONOMIC IMPACT:" +
      "The 2017 WannaCry ransom attack was a worldwide cyberattack that crippled thousands of computers across 150 countries by exploiting a vulnerability in the Windows Operating system, encrypting user data and demanding payments through Bitcoin in exchange for decryption. This caused a loss of billions of dollars due to ransom payments, halted operations, and recovery costs." +
      "Financial institutions such as banks and Stock exchanges had to endure many setbacks leading to a loss of revenue as well as user confidence in the security of these financial systems. This attack became a perfect example of how interconnected global economies are at risk of digital threats." +
      "INFRASTURCTURE VULNERABILITIES:" +
      "Power grids, communication networks and transportation systems are crucial infrastructure for the functioning of modern societies. A successful operation of a cyberattack on a transportation system can paralyze a system and affect millions on their daily commute. Equally, a disruption in the water supply of a targeted area can cause the loss of clean water to hundreds and thousands." +
      "A recent example is the 2021 Colonial Pipeline ransomware attack, which halted fuel supplies and led to widespread fuel shortages across the Eastern United States. As technological innovations create smarter and more interconnected systems, it is important to recognize that leveraging these advancements for more efficient infrastructure facilities also increases their exposure to cyberwarfare." +
      "HEALTHCARE DISRUPTIONS:" +
      "The healthcare sector is responsible for updating and safekeeping patient records as well as delivering critical services to those in need. With the evolution in technology, storing patient records have transitioned from digital to physical mediums, making accessing, updating, expanding and many other functions much more efficient. An attack on these digital systems can disrupt medical operations, delay patient care, and compromise sensitive medical records." +
      "In September 2020, Düsseldorf University Hospital in Germany suffered a ransomware attack that severely disrupted its IT systems. As a result, the hospital had to turn away emergency patients, redirecting them to other facilities. Tragically, one woman, sent to a hospital 20 miles away, died due to the delay in her transfer. These outbreaks not only endanger patient safety but also cause customers to become wary and uncertain about seeking medical assistance." +
      "NATIONAL SECURITY RISKS:" +
      "Cyberwarfare poses an unprecedented threat to security and defense approaches at a national level. Cyberattacks targeting government networks can break in and publish sensitive information, block nation-wide access to essential services and cripple a nation’s defensive efforts." +
      "In December 2016, the Russian hacker group Sandworm, used a malware known as “Industroyer” or “Crash Override” to disrupt the power distribution system in a power grid in Kiev, Ukraine, which led to mass blackouts in parts of the city. Incidents like these highlight the massive and undeniable impact that cyber warfare has on the everyday life of global citizens." +
      "PERSONAL PRIVACY AND SECURITY" +
      "The 21st century is an era where personal data is progressively digitized and stored online for ease and practicality. Data breaches from cyber-attacks on these personal records can result in identity theft, financial fraud, and irreparable damage to personal reputation." +
      "In 2013, the American retail cooperation Target was hacked using stolen credentials from a third-party HVAC vendor. The attack was done using a malware installed on point-of-sale (POS) terminals to compromise over 40 million credit and debit card accounts, along with names, addresses, phone numbers and email addresses of over 70 million customers. This incident exemplifies how cyberwarfare affects everyday life." +
      "CONCLUSION:" +
      "In conclusion, we can see that cyberwarfare has seeped into almost every aspect of modern society. From economic disruptions, infrastructure liabilities and healthcare vulnerabilities to national security risks and personal privacy concerns, the consequences of cyber warfare have unraveled the fabric of an interconnected globe." +
      "Moving forward into the future, by enhancing cybersecurity measures, fostering public awareness, and promoting international cooperation among nations, societies can better prepare for the impacts of cyberwarfare, ultimately leading to a safer and more secure everyday life for their citizens." +
      "Penned by: Thisak Gunasekara, Editorial Team | SLIIT Mozilla",
    author: "Thisak Gunasekara",
    date: "2024-07-17",
    tags: ["Cybersecurity", "Cyberwarfare"],
    imageUrl: "/assets/blog3.png",
  },
  {
    id: "3",
    title: "Java and it’s benefits compared to other programming languages",
    excerpt:
      "The name of this programming language, JAVA is coming from Indonesian islands where there are huge coffee plantations.",
    content:
      "The name of this programming language, JAVA is coming from Indonesian islands where there are huge coffee plantations. The similarity of both the programming language name and the coffee, is that word Java is synonymous with coffee in english language." +
      "Java is one of the most used and popular programming languages in the world and it was a computer system invented by Sun Microsystems back in 1995. The Java language provides a massive service to the modern digital world by helping building numerous apps and services." +
      "In past decades many programming languages have been invented but the popularity and the usage of Java has never been reduced or tarnished. And the benefits of Java compared to other programming languages are mentioned below." +
      "Java is easy to learn due to it’s simplest utilisation and easiness to understand. Even the usage of Java is simpler than initial proramming languages like C & C++. Additionally if you know English, it’s like you know half of the syntaxes of the language. An object-oriented programming language, which helps reusing the codes already being used previously. Java is inexpensive due to it’s low development and easy to maintain. Even it can be easily run on machines. Java is stable because the new versions and updates can be released quickly with advanced or developed functionalities." +
      "~Penned by Charuka Wanigasinghe, Editorial Team | SLIIT Mozilla",
    author: "Charuka Wanigasinghe",
    date: "2024-07-17",
    tags: ["Java", "Tech", "Programming"],
    imageUrl: "/assets/blog1.png",
  },
]
