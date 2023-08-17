//security-plus.js

const answersTrackerContainer = document.querySelector(".answers-tracker");
const options = document.querySelector(".options").children;
const questionNumberSpan = document.querySelector(".question-num-value");
const question = document.querySelector(".question");
const totalQuestionsSpan = document.querySelector(".total-questions");
const correctAnswersSpan = document.querySelector(".correct-answers");
const totalQuestionsSpan2 = document.querySelector(".total-questions2");
const percentageSpan = document.querySelector(".percentage");
const chapterSelect = document.getElementById("chapter");

let currentIndex = 0;
let index = 0;
let answeredQuestions = [];
let score = 0;
let selectedChapter = 0; // Initialize selected chapter to 0
let currentQuestions = []; // Array of question objects

const opt1 = document.querySelector(".option1");
const opt2 = document.querySelector(".option2");
const opt3 = document.querySelector(".option3");
const opt4 = document.querySelector(".option4");

const chapters = [
    {}, // Placeholder for chapter 0
    {
        title: "Threats, Attacks, and Vulnerabilities",
        questions: [
            {
                q: "Which one of the following types of malware can spread without any user interaction?",
                options: ["Adware", "Trojan", "Spyware", "Worm"],
                answer: 3
            },
            {
                q: "What language is commonly used to automate the execution of system administration tasks on Windows systems?",
                options: ["Java", "PowerShell", "Bash", "Python"],
                answer: 1
            },
            {
                q: "Which of the following is a common command-and-control mechanism for botnets?",
                options: ["SMTP", "IRC", "HTTP", "SNMP"],
                answer: 2
            },
            {
                q: "Where do fileless viruses often store themselves to maintain persistence?",
                options: ["Program Files", "Temp Folder", "System32 Directory", "Windows Registry"],
                answer: 3
            },
            {
                q: "What type of malware delivers its payload only after certain conditions are met, such as specific date and time occurring?",
                options: ["Trojan", "Logic Bomb", "Adware", "Ransomware"],
                answer: 1
            },
            {
                q: "Cryptolocker is an example of what type of malicious software?",
                options: ["Worm", "Adware", "Ransomware", "Spyware"],
                answer: 2
            },
            {
                q: "What device is often used in card cloning attacks?",
                options: ["Firewall", "Honeypot", "Keylogger", "Skimmer"],
                answer: 3
            },
            {
                q: "Which one of the following controls is not particularly effective against the insider threat?",
                options: ["Intrusion Detection Systems", "Access Control Lists", "User Training", "Firewalls"],
                answer: 0
            },
            {
                q: "What type of attacker is primarily concerned with advancing an ideological agenda?",
                options: ["Cybercriminal", "Hacktivist", "Script Kiddie", "Nation-state Actor"],
                answer: 1
            },
            {
                q: "It is difficult to develop defenses against APT attackers.",
                options: ["FALSE", "TRUE", "ALWAYS", "NEVER"],
                answer: 1
            },
            {
                q: "What is the basic principle underlying threat hunting activities?",
                options: ["Assumption of compromise", "Vulnerability assessment", "External monitoring", "Network isolation"],
                answer: 0
            },
            {
                q: "What security technology best assists with the automation of security workflows?",
                options: ["Firewall", "SOAR", "SIEM", "IDS"],
                answer: 1
            },
            {
                q: "What approach to threat identification begins with a listing of all resources owned by the organization?",
                options: ["Incident-focused", "Vulnerability-focused", "Threat-focused", "Asset-focused"],
                answer: 3
            },
            {
                q: "The analysis of adversary TTP includes tools, techniques, and policies.",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "What type of organization facilitates cybersecurity information sharing among industry-specific communities?",
                options: ["NGO", "CERT", "CISO", "ISAC"],
                answer: 3
            },
            {
                q: "Which of the following is a standardized language used to communicate security information between systems and organizations?",
                options: ["HTML", "JSON", "XML", "STIX"],
                answer: 3
            },
            {
                q: "Which of the following is an example of an open-source intelligence resource?",
                options: ["Vulnerability databases", "Dark web", "Security websites", "Social media"],
                answer: 3
            },
            {
                q: "Linda's organization recently experienced a social engineering attack. The attacker called a help desk employee and persuaded her that she was a project manager on a tight deadline and locked out of her account. The help desk technician provided the attacker with access to the account. What social engineering principle was used?",
                options: ["Consistency", "Authority", "Urgency", "Scarcity"],
                answer: 2
            },
            {
                q: "In what type of social engineering attack does the attacker physically observe the victim's activity?",
                options: ["Phishing", "Impersonation", "Shoulder surfing", "Baiting"],
                answer: 2
            },
            {
                q: "What type of website does the attacker use when waging a watering hole attack?",
                options: ["Site known for malware distribution", "Site trusted by the end user", "Site with weak security", "Site with low traffic"],
                answer: 1
            },
            {
                q: "In what technique do attackers pose as their victim to elicit information from third parties?",
                options: ["Phishing", "Pretexting", "Spear phishing", "Baiting"],
                answer: 1
            },
            {
                q: "What type of phishing attack focuses specifically on senior executives of a targeted organization?",
                options: ["Pharming", "Spear phishing", "Whaling", "Vishing"],
                answer: 2
            },
            {
                q: "What type of artificial intelligence technique is most commonly associated with optimization?",
                options: ["Reinforcement learning", "Prescriptive analytics", "Machine learning", "Natural language processing"],
                answer: 1
            },
            {
                q: "The reuse of passwords across multiple sites makes an individual susceptible to _____ attacks.",
                options: ["Ransomware", "Malware", "Credential stuffing", "Phishing"],
                answer: 2
            },
            {
                q: "Dan is engaging in a password cracking attack where he uses precomputed hash values. What type of attack is Dan waging?",
                options: ["Brute force attack", "Salting attack", "Rainbow table", "Dictionary attack"],
                answer: 2
            },
            {
                q: "Data breaches violate which principle of cybersecurity?",
                options: ["Availability", "Integrity", "Confidentiality", "Non-repudiation"],
                answer: 2
            },
            {
                q: "Which one of the following issues is not generally associated with the use of default configurations?",
                options: ["Insecure credentials", "Unnecessary services", "Weak encryption settings", "SQL injection flaws"],
                answer: 3
            },
            {
                q: "It is generally a bad practice to run software after the vendor's end of life.",
                options: ["FALSE", "TRUE", "", ""],
                answer: 1
            },
            {
                q: "Jason recently investigated a vulnerability discovered during a scan and, after exhaustive research, determined that the vulnerability did not exist. What type of error occurred?",
                options: ["False positive", "False negative", "True positive", "True negative"],
                answer: 0
            },
            {
                q: "Which one of the following metrics does not contribute to the exploitability score for a vulnerability in CVSS?",
                options: ["Authentication", "Access vector", "Confidentiality", "Access complexity"],
                answer: 3
            },
            {
                q: "As Dave works with his colleagues in other IT disciplines, he notices that they use different names to refer to the same products and vendors. Which SCAP component would best assist him in reconciling these differences?",
                options: ["CVE", "CCE", "CPE", "CWE"],
                answer: 2
            },
            {
                q: "Helen has vulnerability scanners located at several points on her network. Which one of the following scanners is likely to provide the most complete picture of the vulnerabilities present on a public web server?",
                options: ["Internal Scanner", "Wireless Scanner", "External Scanner", "DMZ Scanner"],
                answer: 2
            },
            {
                q: "Matt would like to limit the tests performed by his vulnerability scanner to only those that affect operating systems installed in his environment. Which setting should he modify?",
                options: ["Port range", "Credential settings", "Authentication settings", "Plug-ins"],
                answer: 3
            },
            {
                q: "Renee is creating a prioritized list of scanning targets. Which one of the following is the least important criteria for her prioritization?",
                options: ["Network segment", "Business impact", "Criticality", "Operating system"],
                answer: 0
            },
            {
                q: "Randy is developing a vulnerability management program. Which one of the following is not a common source of requirements for such a program?",
                options: ["Risk assessment", "Sales team request", "Regulatory compliance", "Industry standards"],
                answer: 1
            },
            {
                q: "What CVSS value is the threshold at which PCI DSS requires remediation to achieve a passing scan?",
                options: ["7", "4", "6", "5"],
                answer: 1
            },
            {
                q: "In a cybersecurity exercise, what team is responsible for serving as moderators?",
                options: ["Blue team", "Black team", "White team", "Red team"],
                answer: 2
            },
            {
                q: "Companies should always manage bug bounty programs internally.",
                options: ["FALSE", "TRUE", "", ""],
                answer: 1
            },
            {
                q: "In a _____ penetration test, the attacker has no prior knowledge of the environment.",
                options: ["Clear box", "Gray box", "White box", "Black box"],
                answer: 3
            }
        ]
    },
    {
        title: "Secure Code Design and Implementation",
        questions: [
            {
                q: "What software development methodology uses four stages in an iterative process?",
                options: ["Agile", "Spiral", "DevOps", "Waterfall"],
                answer: 1
            },
            {
                q: "What phase of the capability maturity model introduces the reuse of code across projects?",
                options: ["Optimizing", "Initial", "Managed", "Defined"],
                answer: 2
            },
            {
                q: "What component of a change management program includes final testing that the software functions properly?",
                options: ["Request management", "Change management", "Release management", "Iteration management"],
                answer: 2
            },
            {
                q: "The DevOps model prioritizes development efforts over operational tasks.",
                options: ["TRUE", "FALSE", "", ""],
                answer: 1
            },
            {
                q: "Static code testing software executes code to verify that it is functioning properly?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 1
            },
            {
                q: "What type of fuzz testing captures real software input and modifies it?",
                options: ["Twist fuzzing", "Switch fuzzing", "Mutation fuzzing", "Generation fuzzing"],
                answer: 2
            },
            {
                q: "The main purpose of a code repository is to store the source files used in software development in a centralized location that allows for secure storage.",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "What is the name of the application control technology built-in to Microsoft Windows?",
                options: ["AppLocker", "BitLocker", "AppControl", "BitControl"],
                answer: 0
            },
            {
                q: "_____ consist of shared code objects that perform related functions.",
                options: ["Libraries", "APIs", "DLPs", "ETLs"],
                answer: 0
            },
            {
                q: "What is the first step of a Fagan inspection?",
                options: ["Meeting", "Preparation", "Overview", "Planning"],
                answer: 3
            },
            {
                q: "What type of attack seeks to write data to areas of memory reserved for other purposes?",
                options: ["Buffer overflow", "XSS", "XSRF", "SQL injection"],
                answer: 0
            },
            {
                q: "What type of object must a hacker typically access in order to engage in a session hijacking attack?",
                options: ["Hard disk", "Network cable", "One-time password generator", "Cookie"],
                answer: 3
            },
            {
                q: "Privilege escalation attacks require a normal user account to execute.",
                options: ["FALSE", "TRUE", "", ""],
                answer: 1
            },
            {
                q: "What attack technique wraps malicious code around a legitimate driver?",
                options: ["Driver phreaking", "Driver refactoring", "Driver signing", "Driver shimming"],
                answer: 3
            },
            {
                q: "What condition occurs when a software package fails to release memory that it reserved for use?",
                options: ["Memory leak", "Core dump", "DDoS", "Race condition"],
                answer: 0
            },
            {
                q: "Which of the following is a race condition attack?",
                options: ["SQLi", "XSRF", "XSS", "TOC/TOU"],
                answer: 3
            },
            {
                q: "Which one of the following is not a standard application hardening technique?",
                options: ["Apply security patches promptly", "Conduct cross-site scripting", "Validate user input", "Encrypt sensitive information"],
                answer: 1
            },
            {
                q: "What is the most effective defense against cross-site scripting attacks?",
                options: ["Input validation", "Antivirus software", "Vulnerability scanning", "Query parameterization"],
                answer: 0
            },
            {
                q: "Which one of the following is not an effective defense against XSRF attacks?",
                options: ["Network segmentation", "User education", "Preventing the use of HTTP GET requests", "Automatic logouts"],
                answer: 0
            },
            {
                q: "Alan is analyzing his web server logs and sees several strange entries that contain strings similar to ../../ in URL requests. What type of attack was attempted against his server?",
                options: ["Buffer overflow", "Cross-site scripting", "Directory traversal", "SQL injection"],
                answer: 2
            },
            {
                q: "What protocol may be used to secure passwords in transit to a web application?",
                options: ["TLS", "MS-CHAPv2", "MS-CHAPv1", "PAP"],
                answer: 0
            },
            {
                q: "What Java clause is critical for error handling?",
                options: ["Try...Catch", "While...Until", "If...Then", "For....Next"],
                answer: 0
            },
            {
                q: "Developers wishing to sign their code must have a _____.",
                options: ["Shared secret key", "Software license", "Patent", "Digital certificate"],
                answer: 3
            },
            {
                q: "Database normalization should always be used to improve database security",
                options: ["FALSE", "TRUE", "", ""],
                answer: 1
            },
            {
                q: "Removing names and identification numbers is usually all that is necessary to deidentify a dataset.",
                options: ["FALSE", "TRUE", "", ""],
                answer: 1
            },
            {
                q: "What data obfuscation technique is intended to be reversible?",
                options: ["Masking", "Deletion", "Hashing", "Tokenization"],
                answer: 3
            },
            {
                q: "What input validation approach works to exclude prohibited input?",
                options: ["Bluelisting", "Blacklisting", "Whitelisting", "Greenlisting"],
                answer: 1
            },
            {
                q: "Which one of the following technologies is an example of a parameterized query?",
                options: ["Output encoding", "Masked identifier", "Hashed identifier", "Stored procedure"],
                answer: 3
            },
        ]
    },
    {
        title: "Cryptography Design and Implementation",
        questions: [
            {
                q: "What is the simplest way to take an existing cipher and make it stronger?",
                options: ["Increase the length of the encryption key", "Use a different algorithm", "Use a larger block size", "Increase the number of rounds"],
                answer: 0
            },
            {
                q: "Which one of the following is NOT critical to the security of one-time pad operations?",
                options: ["Using AES in conjunction with the one-time pad", "Generating truly random keys", "Using the key only once", "Keeping the key secret"],
                answer: 0
            },
            {
                q: "Alice would like to be able to prove to Charlie that a message she received actually came from Bob. What cryptographic goal is Alice trying to enforce?",
                options: ["Confidentiality", "Integrity", "Availability", "Non-repudiation"],
                answer: 3
            },
            {
                q: "Bob is planning to use a cryptographic cipher that rearranges the characters in a message. What type of cipher is Bob planning to use?",
                options: ["Substitution Cipher", "Transposition Cipher", "Polyalphabetic Cipher", "Stream Cipher"],
                answer: 1
            },
            {
                q: "What operation uses a cryptographic key to convert plaintext into ciphertext?",
                options: ["Encryption", "Decryption", "Hashing", "Signing"],
                answer: 0
            },
            {
                q: "If Alice wants to send a message to Bob using symmetric cryptography, what key does she use to encrypt the message?",
                options: ["Alice's public key", "Bob's public key", "A shared secret key", "A randomly generated key"],
                answer: 2
            },
            {
                q: "What length encryption key does the Data Encryption Standard use?",
                options: ["128 bits", "256 bits", "64 bits", "56 bits"],
                answer: 3
            },
            {
                q: "How many keys should be used with 3DES to achieve the greatest level of security?",
                options: ["1", "2", "3", "4"],
                answer: 2
            },
            {
                q: "Jasmine comes across a file sent out of her organization that she suspects contains proprietary trade secrets but appears to be an innocuous image. What technique might the sender have used to hide information in the image?",
                options: ["Encryption", "Steganography", "Obfuscation", "Compression"],
                answer: 1
            },
            {
                q: "What basic cryptographic functions does the AES algorithm use to encrypt plaintext?",
                options: ["Substitution and permutation", "Substitution and transposition", "Permutation and transposition", "Substitution, permutation, and transposition"],
                answer: 1
            },
            {
                q: "What action can users take to overcome security flaws in RC4?",
                options: ["Use longer encryption keys", "Use a different algorithm", "Use RC4 in conjunction with AES", "It is not possible to use RC4 securely"],
                answer: 3
            },
            {
                q: "When you communicate over the Tor network, which of the following entities do you communicate with directly?",
                options: ["Exit node", "Middle node", "Entry node", "Directory node"],
                answer: 2
            },
            {
                q: "What key is actually used to encrypt the contents of a message when using PGP?",
                options: ["Sender's private key", "Receiver's public key", "Receiver's private key", "Randomly generated key"],
                answer: 3
            },
            {
                q: "Which one of the following encryption approaches is most susceptible to a quantum computing attack?",
                options: ["RSA", "AES", "Diffie-Hellman", "Elliptic curve cryptography"],
                answer: 3
            },
            {
                q: "Alice would like to send a message to Bob using RSA encryption. What key should she use to encrypt the message?",
                options: ["Alice's private key", "Alice's public key", "Bob's private key", "Bob's public key"],
                answer: 3
            },
            {
                q: "The difficulty of solving what mathematical problem provides the security underlying the Diffie-Hellman algorithm?",
                options: ["Factorization", "Discrete logarithm", "Prime factorization", "Matrix multiplication"],
                answer: 1
            },
            {
                q: "Which one of the following is an example of an in-band approach to key exchange?",
                options: ["Diffie-Hellman", "RSA", "PGP", "Kerberos"],
                answer: 0
            },
            {
                q: "In the early 1990s, the National Security Agency attempted to introduce key escrow using what failed technology?",
                options: ["Clipper chip", "RSA", "AES", "Blowfish"],
                answer: 0
            },
            {
                q: "What algorithm uses the Blowfish cipher along with a salt to strengthen cryptographic keys?",
                options: ["AES", "RSA", "DES", "Bcrypt"],
                answer: 3
            },
            {
                q: "What standard governs the structure and content of digital certificates?",
                options: ["TLS", "SSH", "PGP", "X.509"],
                answer: 3
            },
            {
                q: "Harold works for a certificate authority and wants to ensure that his organization is able to revoke digital certificates that it creates. What is the most effective method of revoking digital certificates?",
                options: ["Certificate Revocation List (CRL)", "Online Certificate Status Protocol (OCSP)", "Transport Layer Security (TLS)", "Public Key Infrastructure (PKI)"],
                answer: 1
            },
            {
                q: "Maloof would like to digitally sign a message that he is sending to Clementine. What key does he use to create the digital signature?",
                options: ["Maloof's public key", "Maloof's private key", "Clementine's public key", "Clementine's private key"],
                answer: 1
            },
            {
                q: "Which one of the following is not a possible hash length from the SHA-2 function?",
                options: ["128 bits", "256 bits", "384 bits", "512 bits"],
                answer: 0
            },
            {
                q: "Which one of these file extensions is always associated with certificates stored in binary form?",
                options: [".PEM", ".CER", ".DER", ".PFX"],
                answer: 3
            },
            {
                q: "Which one of the following is not a barrier to using the web of trust (WoT) approach?",
                options: ["Lack of central authority", "Use of weak cryptography", "Limited scalability", "Complexity of implementation"],
                answer: 1
            },
            {
                q: "What technology can you use to tell clients that a certificate is unlikely to change over time?",
                options: ["Public Key Infrastructure (PKI)", "Certificate Transparency (CT)", "Certificate Pinning", "Online Certificate Status Protocol (OCSP)"],
                answer: 2
            },
            {
                q: "What type of digital certificate offers the highest possible level of trust?",
                options: ["Self-signed certificate", "Domain-validated (DV) certificate", "Organization-validated (OV) certificate", "Extended Validation (EV) certificate"],
                answer: 3
            },
            {
                q: "Who provides the digital signature on a digital certificate?",
                options: ["End user", "Certificate authority", "Internet service provider", "Domain registrar"],
                answer: 1
            },
            {
                q: "What technology allows web servers to attach an OCSP validation to the certificate they send to users?",
                options: ["Certificate Transparency (CT)", "Certificate Revocation List (CRL)", "Certificate Stapling", "Online Certificate Status Protocol (OCSP)"],
                answer: 2
            },
            {
                q: "Which one of the following would typically be an offline CA?",
                options: ["Intermediate CA", "Root CA", "Subordinate CA", "Issuing CA"],
                answer: 1
            },
            {
                q: "What type of attack is possible when the attacker has access to both an encrypted and unencrypted version of a single message?",
                options: ["Brute force attack", "Known-plaintext attack", "Chosen-plaintext attack", "Collision attack"],
                answer: 1
            },
            {
                q: "Conducting a brute force attack requires a sample of plaintext?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 1
            },
            {
                q: "Which one of the following is the most secure way for web servers and web browsers to communicate with each other?",
                options: ["HTTP", "FTP", "SMTP", "TLS"],
                answer: 3
            }
        ]
    },
    {
        title: "Identity and Access Management Design and Implementation",
        questions: [
            {
                q: "What characteristic of biometrics measures the frequency at which legitimate users are denied access to a system or facility?",
                options: ["False acceptance rate", "False rejection rate", "Crossover error rate", "True positive rate"],
                answer: 1
            },
            {
                q: "During what phase of the access control process does a user prove his or her identity?",
                options: ["Authorization", "Identification", "Authentication", "Validation"],
                answer: 2
            },
            {
                q: "Which one of the following access control cards is the easiest to duplicate without permission?",
                options: ["Proximity card", "Smart card", "Magnetic stripe card", "Bar code card"],
                answer: 2
            },
            {
                q: "Ricky would like to use an authentication protocol that fully encrypts the authentication session, uses the reliable TCP protocol and will work on his Cisco devices. What protocol should he choose?",
                options: ["RADIUS", "TACACS+", "LDAP", "Kerberos"],
                answer: 1
            },
            {
                q: "In the Kerberos protocol, what system performs authentication of the end user?",
                options: ["TGS", "AS", "KDC", "Client"],
                answer: 1
            },
            {
                q: "Which one of the following authentication protocols requires the use of external encryption to protect passwords?",
                options: ["PAP", "CHAP", "MS-CHAP", "EAP"],
                answer: 0
            },
            {
                q: "Which one of the following is not an example of federated authentication?",
                options: ["SAML", "OpenID Connect", "RADIUS", "OAuth"],
                answer: 2
            },
            {
                q: "Which one of the following is an example of multifactor authentication?",
                options: ["Username and password", "Smart card", "Fingerprint scan", "Password reset question"],
                answer: 2
            },
            {
                q: "Jane uses an authentication token that requires her to push a button each time she wishes to login to a system. What type of token is she using?",
                options: ["HOTP", "TOTP", "Challenge-response", "Biometric"],
                answer: 0
            },
            {
                q: "Security questions are an example of what type of authentication factor?",
                options: ["Something you know", "Something you have", "Something you are", "Somewhere you are"],
                answer: 0
            },
            {
                q: "What file permission does NOT allow a user to launch an application?",
                options: ["Read", "Write", "Execute", "Modify"],
                answer: 2
            },
            {
                q: "Tobias recently permanently moved from a job in accounting to a job in human resources but never had his accounting privileges revoked. What situation occurred in this case?",
                options: ["Role explosion", "Privilege creep", "Separation of duties", "Least privilege violation"],
                answer: 1
            },
            {
                q: "In a discretionary access control system, individual users have the ability to alter access permissions?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "Windows provides a facility for administrators to implement Time of Day restrictions without requiring the use of a third party tool?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "Which one of the following is not a normal account activity attribute to monitor?",
                options: ["Logins and logouts", "File access and modification", "Account lockouts", "Password changes"],
                answer: 2
            },
            {
                q: "When a user is terminated, administrators should first disable the account and then delete it later?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "What Windows mechanism allows the easy application of security settings to groups of users?",
                options: ["File encryption", "Permissions inheritance", "Security templates", "Group Policy Objects (GPOs)"],
                answer: 3
            },
            {
                q: "Matt would like to assign users to roles within his Windows enterprise. What feature can he use to create a role?",
                options: ["Security policy", "Access control list (ACL)", "User account", "Security group"],
                answer: 3
            },
            {
                q: "Which of the following is not an important account management practice for security professionals?",
                options: ["Privilege escalation", "User provisioning", "Account auditing", "Privele creep"],
                answer: 3
            }
        ]
    },
    {
        title: "Physical Security Design and Implementation",
        questions: [
            {
                q: "What type of physical security control should always be disclosed to visitors when used?",
                options: ["Fencing", "Cameras", "Access control", "Biometric scanners"],
                answer: 1
            },
            {
                q: "What type of lock always requires entering a code to enter the facility?",
                options: ["Deadbolt lock", "Magnetic lock", "Keycard lock", "Cipher lock"],
                answer: 3
            },
            {
                q: "What class of fire extinguisher is designed to work on electrical fires?",
                options: ["Class A", "Class B", "Class C", "Class D"],
                answer: 2
            },
            {
                q: "What is the minimum acceptable temperature for a data center?",
                options: ["59.0 degrees Fahrenheit", "64.4 degrees Fahrenheit", "68.0 degrees Fahrenheit", "72.2 degrees Fahrenheit"],
                answer: 1
            },
            {
                q: "Cable distribution runs are not normally included in a site's physical security plan.",
                options: ["TRUE", "FALSE", "", ""],
                answer: 1
            },
            {
                q: "Which one of the following data sanitization strategies is most secure?",
                options: ["Overwriting", "Formatting", "Encryption", "Destruction"],
                answer: 3
            },
            {
                q: "Which one of the following security mechanisms prevents laptops from theft while they are in use?",
                options: ["Biometric authentication", "Access control lists", "Cable lock", "Intrusion detection system"],
                answer: 2
            },
            {
                q: "What is the minimum number of disks required to perform RAID level 5?",
                options: ["2", "3", "4", "5"],
                answer: 1
            },
            {
                q: "What type of control are we using if we supplement a single firewall with a second standby firewall ready to assume responsibility if the primary firewall fails?",
                options: ["Redundancy", "High availability", "Failover", "Load balancing"],
                answer: 1
            },
            {
                q: "What goal of security is enhanced by a strong business continuity program?",
                options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
                answer: 2
            },
            {
                q: "Which one of the following disaster recovery tests involves the actual activation of the DR site?",
                options: ["Tabletop test", "Full-scale test", "Partial test", "Parallel test"],
                answer: 3
            },
            {
                q: "What type of disaster recovery site is able to be activated most quickly in the event of a disruption?",
                options: ["Warm site", "Hot site", "Cold site", "Mobile site"],
                answer: 1
            },
            {
                q: "What type of backup includes only those files that have changed since the most recent full or incremental backup?",
                options: ["Full backup", "Differential backup", "Incremental backup", "Copy backup"],
                answer: 2
            },
            {
                q: "What disaster recovery metric provides the targeted amount of time to restore a service after a failure?",
                options: ["RTO", "RPO", "MTBF", "MTTR"],
                answer: 0
            }
        ]
    },
    {
        title: "Cloud Security Desing and Implementation",
        questions: [
            {
                q: "Who provides cloud computing services for sale to third parties?",
                options: ["Cloud service customers", "Cloud service providers", "Data centers", "Network providers"],
                answer: 1
            },
            {
                q: "Which one of the following is not a characteristic of cloud computing?",
                options: ["On-demand self-service", "Broad network access", "Resource pooling", "Cloud computing offers access to configurable, not fixed, computing resources."],
                answer: 3
            },
            {
                q: "Which one of the following expenses typically is billed to the user directly in on-premises environments but not in cloud environments?",
                options: ["Hardware costs", "Software licensing costs", "Maintenance costs", "Electricity costs."],
                answer: 3
            },
            {
                q: "What situation occurs when cloud service customers request more services than the provider has capacity?",
                options: ["Oversubscription", "Resource pooling", "Scalability", "Virtualization"],
                answer: 0
            },
            {
                q: "What type of cloud scaling adds more servers to the pool to meet increased demand?",
                options: ["Vertical scaling", "Horizontal scaling", "Elastic scaling", "Dynamic scaling"],
                answer: 1
            },
            {
                q: "Which one of the following services is an example of desktop virtualization?",
                options: ["Amazon EC2", "Amazon S3", "Amazon RDS", "Amazon Workspaces is a VDI service."],
                answer: 3
            },
            {
                q: "What type of hypervisor requires a host operating system?",
                options: ["Type 1 hypervisor", "Type 2 hypervisor", "Bare-metal hypervisor", "Virtualized hypervisor"],
                answer: 1
            },
            {
                q: "Which one of the following services offers block storage volumes?",
                options: ["Amazon EC2", "Amazon S3", "Amazon RDS", "Amazon EBS."],
                answer: 3
            },
            {
                q: "When selecting a cloud server instance, which feature is generally not user-configurable?",
                options: ["Virtual machine size", "Operating system", "Networking configuration", "The hypervisor is generally transparent to the end user and selected by the provider."],
                answer: 3
            },
            {
                q: "Which one of the following does not need to exist in a containerized computing environment?",
                options: ["Container images", "Docker containers", "Application code", "Hypervisors are not required in containerization environments."],
                answer: 3
            },
            {
                q: "Which one of the following is not a common deployment option for relational databases?",
                options: ["On-premises deployment", "Cloud deployment", "Database instance deployment", "Use a VDI service."],
                answer: 3
            },
            {
                q: "What cloud computing technology is similar to the VLANs used in an on-premises network?",
                options: ["Virtual private clouds (VPCs)", "Content delivery networks (CDNs)", "Edge computing environments", "Hybrid cloud environments"],
                answer: 0
            },
            {
                q: "What technology do cloud orchestration services use to interact with cloud service providers?",
                options: ["Hypervisors", "Virtual machines", "Containers", "API calls"],
                answer: 3
            },
            {
                q: "What type of document is used to agree upon vendor obligations?",
                options: ["Terms of service", "Service level agreements", "Master service agreement", "End-user license agreement"],
                answer: 1
            },
            {
                q: "What cybersecurity tenet is violated when a customer's cloud-hosted website goes down?",
                options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
                answer: 2
            },
            {
                q: "Purchasing server instances and configuring them to run your own software is an example of what cloud deployment model?",
                options: ["Public cloud", "Private cloud", "Hybrid cloud", "Community cloud"],
                answer: 1
            },
            {
                q: "When handling cross-jurisdictional issues, disputes are resolved based upon the law of the cloud service provider's home country?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 1
            },
            {
                q: "Which cloud deployment model exclusively uses dedicated cloud resources for a customer?",
                options: ["Public cloud", "Private cloud", "Hybrid cloud", "Community cloud"],
                answer: 1
            },
            {
                q: "Which of the following is a provider activity in the cloud reference architecture?",
                options: ["User account management", "Data processing tasks", "Data ownership", "Providing audit data is a provider activity."],
                answer: 3
            },
            {
                q: "Which cloud security control can be used to limit the amount of money spent by a user within the cloud customer's organization?",
                options: ["Access control lists", "Resource policies", "Encryption keys", "Firewalls"],
                answer: 1
            },
            {
                q: "What security control would normally be used to add encryption for data in transit to and from a cloud-based web server?",
                options: ["Firewall rules", "VPN tunnels", "Access control lists", "Transport layer security (TLS) is used to protect data in transit over a network."],
                answer: 3
            },
            {
                q: "What cloud security control is used to replace firewall functionality for IaaS environments?",
                options: ["Security groups", "Intrusion detection systems", "Virtual private networks", "Firewall rules"],
                answer: 0
            }
        ]
    },
    {
        title: "Endpoint Security Desing and Implementation",
        questions: [
            {
                q: "What command is used to apply operating system updates on some Linux distributions?",
                options: ["apt-get", "yum", "dnf", "pacman"],
                answer: 1
            },
            {
                q: "What type of malware prevention is most effective against known viruses?",
                options: ["Behavioral analysis", "Heuristic analysis", "Signature detection", "Zero-day analysis"],
                answer: 2
            },
            {
                q: "What is the name of the application control technology built-in to Microsoft Windows?",
                options: ["Firewall", "Anti-virus", "IPS", "AppLocker"],
                answer: 3
            },
            {
                q: "Which one of the following security controls is built in to Microsoft Windows?",
                options: ["Host-based intrusion detection system (HIDS)", "Network-based intrusion detection system (NIDS)", "Host firewall", "Access control lists (ACLs)"],
                answer: 2
            },
            {
                q: "Which one of the following is a file integrity monitoring tool?",
                options: ["Nmap", "Wireshark", "Tripwire", "Metasploit"],
                answer: 2
            },
            {
                q: "What DLP technique tags sensitive content and then watches for those tags in data leaving the organization?",
                options: ["Data at rest encryption", "Data masking", "Content discovery", "Watermarking"],
                answer: 3
            },
            {
                q: "Which one of the following security mechanisms prevents laptops from theft while they are in use?",
                options: ["Biometric authentication", "Access control lists", "Cable lock", "Intrusion detection system"],
                answer: 2
            },
            {
                q: "Which one of the following statements about printers is incorrect?",
                options: ["Printers are output devices", "Printers can store copies of printed documents", "Printers can be attached to networks", "Printers typically require no routine maintenance."],
                answer: 3
            },
            {
                q: "What hardware technology may be embedded in a laptop computer to protect encrypted hard drives from removal?",
                options: ["USB port", "Bluetooth module", "TPM", "Wi-Fi card"],
                answer: 2
            },
            {
                q: "What component of a change management program includes final testing that the software functions properly?",
                options: ["Change control board", "Risk assessment", "Release management", "Version control"],
                answer: 2
            },
            {
                q: "What term best describes making a snapshot of a system or application at a point in time for later comparison?",
                options: ["Cloning", "Virtualization", "Baselining", "Profiling"],
                answer: 2
            },
            {
                q: "What type of system is used to gather information from remote sensors via telemetry?",
                options: ["Access control system", "Intrusion detection system", "Firewall system", "SCADA"],
                answer: 3
            },
            {
                q: "What communications technology provides the widest global coverage?",
                options: ["Bluetooth", "Wi-Fi", "Cellular", "Satellite"],
                answer: 3
            },
            {
                q: "What technology can you use as a compensating control when it's not possible to patch an embedded system?",
                options: ["Firewall", "Antivirus", "Intrusion Detection System", "Wrappers"],
                answer: 3
            },
            {
                q: "What is the most important control to apply to smart devices?",
                options: ["Physical security", "Network segmentation", "Encryption", "Access control"],
                answer: 1
            },
            {
                q: "Embedded systems often suffer from limited access to power and bandwidth?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "Which one of the following shell environments is commonly associated with Windows systems?",
                options: ["Bash", "PowerShell", "Zsh", "Fish"],
                answer: 1
            },
            {
                q: "What file manipulation command is used to search the contents of a text file?",
                options: ["find", "grep", "locate", "ls"],
                answer: 1
            },
            {
                q: "What Linux file permissions group is used to describe the permissions assigned to any user of the system?",
                options: ["u", "g", "o", "a"],
                answer: 2
            }
        ]
    },
    {
        title: "Network Security Desing and Implementation",
        questions: [
            {
                q: "What command sends ICMP Echo Request packets?",
                options: ["ping", "traceroute", "nslookup", "netstat"],
                answer: 0
            },
            {
                q: "Which one of the following ports is not normally used by email systems?",
                options: ["25", "110", "139", "143"],
                answer: 2
            },
            {
                q: "Dennis would like to capture the DNS traffic on his network using Wireshark. What port should he use in his capture filter to restrict his capture to DNS queries and responses?",
                options: ["TCP 53", "UDP 53", "TCP 80", "UDP 80"],
                answer: 1
            },
            {
                q: "What technology provides the translation that assigns public IP addresses to privately addressed systems that wish to communicate on the Internet?",
                options: ["VLAN", "NAT", "DMZ", "VPN"],
                answer: 1
            },
            {
                q: "What TCP flag indicates that a packet is requesting a new connection?",
                options: ["ACK", "SYN", "FIN", "RST"],
                answer: 1
            },
            {
                q: "Which one of the following devices would not typically be found in a DMZ?",
                options: ["Web server", "Firewall", "Intrusion Detection System (IDS)", "File server"],
                answer: 3
            },
            {
                q: "Which one of the following devices carries VLANs on a network?",
                options: ["Hub", "Switch", "Router", "Firewall"],
                answer: 1
            },
            {
                q: "Ricky would like to separate his network into three distinct security zones. Which one of the following devices is best suited to that task?",
                options: ["Firewall", "Switch", "Router", "Access point"],
                answer: 0
            },
            {
                q: "Which one of the following devices helps networked services scale with increasing demand?",
                options: ["Firewall", "Router", "Load balancer", "Proxy server"],
                answer: 2
            },
            {
                q: "What security principle does a firewall implement with traffic when it does not have a rule that explicitly defines an action for that communication?",
                options: ["Least privilege", "Implicit deny", "Strong encryption", "Network segmentation"],
                answer: 1
            },
            {
                q: "What network device can connect together multiple networks?",
                options: ["Switch", "Firewall", "Router", "Access point"],
                answer: 2
            },
            {
                q: "Which one of the following functions is not normally found in a UTM device?",
                options: ["Firewall", "Anti-virus", "Intrusion Detection System (IDS)", "SSL termination"],
                answer: 3
            },
            {
                q: "Which one of the following tools is a protocol analyzer?",
                options: ["Wireshark", "Nmap", "Metasploit", "Burp Suite"],
                answer: 0
            },
            {
                q: "Which one of the following network intrusion detection technologies requires frequent threat updates from the vendor?",
                options: ["Behavioral analysis", "Signature detection", "Anomaly detection", "Heuristic analysis"],
                answer: 1
            },
            {
                q: "What network port is used for SSL/TLS VPN connections?",
                options: ["22", "80", "443", "1194"],
                answer: 2
            },
            {
                q: "What technology can help prevent denial of service attacks on a network?",
                options: ["Flood guard", "Packet filter", "Access control lists", "Intrusion Detection System (IDS)"],
                answer: 0
            },
            {
                q: "What technique should network administrators use on switches to limit the exposure of sensitive network traffic?",
                options: ["Packet filtering", "MAC filtering", "VLAN pruning", "Port forwarding"],
                answer: 2
            },
            {
                q: "What router technology can be used to perform basic firewall functionality?",
                options: ["ACLs", "NAT", "Port forwarding", "VLANs"],
                answer: 0
            },
            {
                q: "What type of firewall rule error occurs when a service is decommissioned but the related firewall rules are not removed?",
                options: ["Shadow rule", "Orphaned rule", "Stale rule", "Legacy rule"],
                answer: 1
            },
            {
                q: "What is the piece of software running on a device that enables it to connect to a NAC-protected network?",
                options: ["NAC agent", "NAC server", "RADIUS server", "Supplicant"],
                answer: 3
            },
            {
                q: "Vic is planning a redesign of his organization's firewall strategy and is planning to issue an RFP for a firewall vendor. Which one of the following vendors would not be able to meet Vic's needs?",
                options: ["Cisco", "Fortinet", "Palo Alto Networks", "Proofpoint"],
                answer: 3
            },
            {
                q: "Fran's network recently suffered a botnet infestation and she would like to implement a control that limits the ability of botnets to reach their command-and-control servers. Which one of the following deception technologies would best meet this need?",
                options: ["Honeypot", "Honeytoken", "DNS sinkhole", "Honeynet"],
                answer: 2
            },
            {
                q: "Nancy is designing a security strategy for remote access. She would like to provide administrators with an intermediate box that they connect to before reaching sensitive systems. What type of service is Nancy planning?",
                options: ["Proxy server", "Firewall", "VPN concentrator", "Jump box"],
                answer: 3
            },
            {
                q: "What message can an SNMP agent send to a network management system to report an unusual event?",
                options: ["GET", "SET", "TRAP", "RESPONSE"],
                answer: 2
            },
            {
                q: "What information is not found in network flow data?",
                options: ["Source IP address", "Destination IP address", "Packet content", "Source port"],
                answer: 2
            },
            {
                q: "What IPsec protocol provides confidentiality protection for the content of packets?",
                options: ["AH", "ESP", "ISAKMP", "IKE"],
                answer: 1
            },
            {
                q: "Which one of the following is the most secure way for web servers and web browsers to communicate with each other?",
                options: ["HTTP", "HTTPS", "FTP", "SMTP"],
                answer: 1
            },
            {
                q: "Cindy would like to transfer files between two systems over a network. Which one of the following protocols performs this action over a secure, encrypted connection?",
                options: ["FTP", "SFTP", "SMTP", "POP3"],
                answer: 1
            },
            {
                q: "Fran is choosing an authentication protocol for her organization's wireless network. Which one of the following protocols is the most secure?",
                options: ["WEP", "WPA", "WPA2", "LEAP"],
                answer: 2
            },
            {
                q: "Brad is configuring a new wireless network for his small business. What wireless security standard should he use if he wishes the strongest possible security?",
                options: ["WEP", "WPA", "WPA2", "WPA3"],
                answer: 3
            },
            {
                q: "Renee notices a suspicious individual moving around the vicinity of her company's buildings with a large antenna mounted in his car. Users are not reporting any problems with the network. What type of attack is likely taking place?",
                options: ["Rogue access point", "War driving", "Evil twin", "Bluejacking"],
                answer: 1
            },
            {
                q: "How can you deploy WPS securely?",
                options: ["Enable WPS with a long, complex PIN", "Disable WPS completely", "Use the default WPS PIN", "Use a common, easily guessable WPS PIN"],
                answer: 1
            },
            {
                q: "What command may be used to change the MAC address of a Linux system?",
                options: ["macchanger", "ifconfig", "ipconfig", "arp"],
                answer: 0
            },
            {
                q: "ARP poisoning provides false _____ addresses?",
                options: ["IP", "MAC", "DNS", "NetBIOS"],
                answer: 1
            },
            {
                q: "In what type of attack does the attacker steal a domain registration from the true owner?",
                options: ["DNS poisoning", "Domain hijacking", "Man-in-the-middle", "Pharming"],
                answer: 1
            },
            {
                q: "Which one of the following techniques is useful in preventing replay attacks?",
                options: ["WPS", "WEP", "WPA2", "Session tokens"],
                answer: 3
            },
            {
                q: "What type of packet do participating systems send during a Smurf attack?",
                options: ["TCP SYN", "ICMP Echo Request", "UDP Datagram", "ARP Request"],
                answer: 1
            },
            {
                q: "Chris is attending a hacker convention and overhears someone talking about 'force pairing' a mobile device. What type of attack is the individual discussing?",
                options: ["Bluejacking", "Bluesnarfing", "Bluebugging", "Bruteforcing"],
                answer: 2
            },
            {
                q: "What toolkit enables attackers to easily automate evil twin attacks?",
                options: ["Aircrack-ng", "Wireshark", "KARMA", "Metasploit"],
                answer: 2
            },
            {
                q: "In what mobile deployment model do users choose devices from a list of company-provided options?",
                options: ["BYOD", "CYOD", "COPE", "MDM"],
                answer: 1
            },
            {
                q: "The core issues around BYOD relate to _____?",
                options: ["Ownership", "Authentication", "Encryption", "Network segmentation"],
                answer: 0
            },
            {
                q: "What term is used to describe loading apps onto a device without going through the official app store?",
                options: ["Jailbreaking", "Rooting", "Unlocking", "Sideloading"],
                answer: 3
            },
            {
                q: "Key _____ adds security to the use of encryption?",
                options: ["Escrow", "Exchange", "Management", "Recovery"],
                answer: 2
            },
            {
                q: "What technology allows administrators to pinpoint the location of a mobile device?",
                options: ["RFID", "NFC", "GPS", "Wi-Fi"],
                answer: 2
            },
            {
                q: "In what application control approach may users install only approved software on their devices?",
                options: ["Whitelist", "Blacklist", "Greylist", "Patch management"],
                answer: 0
            },
            {
                q: "Apple devices running current versions of iOS and configured with a passcode or biometric authentication use full device encryption by default?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "What mobile connection method may best serve remote areas without a local infrastructure?",
                options: ["Wi-Fi", "Bluetooth", "Cellular", "Satellite"],
                answer: 3
            },
            {
                q: "Dylan would like to list all of the active network connections on a system. What command can he use?",
                options: ["netstat", "ifconfig", "arp", "ping"],
                answer: 0
            },
            {
                q: "What command displays the routing table on a system?",
                options: ["netstat", "route", "ipconfig", "traceroute"],
                answer: 1
            },
            {
                q: "What is the preferred command for looking up IP addresses on a Linux system?",
                options: ["ping", "ifconfig", "arp", "dig"],
                answer: 3
            },
            {
                q: "Nessus is an example of a _____ tool?",
                options: ["Network vulnerability scanning", "Penetration testing", "Packet capturing", "Packet sniffing"],
                answer: 0
            },
            {
                q: "What command may be used to determine the network path between two locations?",
                options: ["traceroute", "ping", "netstat", "nslookup"],
                answer: 0
            },
            {
                q: "Nmap is an example of a _____ tool?",
                options: ["Network vulnerability scanning", "Penetration testing", "Packet capturing", "Packet sniffing"],
                answer: 1
            },
            {
                q: "Which one of the following is a malware analysis tool?",
                options: ["Nmap", "Wireshark", "Cuckoo", "Metasploit"],
                answer: 2
            },
            {
                q: "What tool allows penetration testers to quickly gather large amounts of information about a domain?",
                options: ["Wireshark", "Nmap", "theHarvester", "Metasploit"],
                answer: 2
            },
            {
                q: "Tom would like to retrieve a file from a remote web server but only has command-line access to the system where he would like to store the file. What command can he use to download the file directly without using a browser?",
                options: ["wget", "curl", "scp", "ftp"],
                answer: 1
            },
            {
                q: "Gary would like to look up the MAC address associated with an IP address on his network. Which command can he use?",
                options: ["ifconfig", "arp", "netstat", "ping"],
                answer: 1
            },
            {
                q: "Alyssa is conducting a penetration test and would like to send raw commands directly to a remote service. What command can she use to open a connection to the service where she may then type direct commands?",
                options: ["ssh", "nc", "telnet", "ftp"],
                answer: 1
            }
        ]
    },
    {
        title: "Operations and Incident Response",
        questions: [
            {
                q: "Who is the most effective person to lead a lessons learned review?",
                options: ["CISO", "IT manager", "Incident responder", "Independent facilitator"],
                answer: 3
            },
            {
                q: "What type of tool assists with the automated validation of systems?",
                options: ["Intrusion detection system", "Network scanner", "Configuration management", "SIEM"],
                answer: 2
            },
            {
                q: "Which one of the following is not a suggested criteria for evaluating containment strategies?",
                options: ["Cost", "Effectiveness", "Speed", "Identity of attacker"],
                answer: 3
            },
            {
                q: "During an incident response, what is the highest priority of first responders?",
                options: ["Identifying the attacker", "Restoring systems", "Analyzing malware", "Containing the damage"],
                answer: 3
            },
            {
                q: "You should rebuild any system that may have been compromised during a security incident?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "What containment strategy moves compromised systems to a separate VLAN attached to the enterprise network?",
                options: ["Isolation", "Quarantine", "Segmentation", "Lockdown"],
                answer: 2
            },
            {
                q: "Which of these individuals would not normally be found on the incident response team?",
                options: ["Forensic analyst", "CEO", "Legal counsel", "Public relations"],
                answer: 1
            },
            {
                q: "You are normally required to report security incidents to law enforcement if you believe a law may have been violated?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "Certifications help employees validate their skills and are an important recruiting and retention tool?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "What company developed the Cyber Kill Chain?",
                options: ["IBM", "Symantec", "FireEye", "Lockheed Martin"],
                answer: 3
            },
            {
                q: "Which of the following is not a core feature of the Diamond Model?",
                options: ["Infrastructure", "Adversary", "Victim", "Exploit"],
                answer: 3
            },
            {
                q: "What do the columns in the ATT&CK matrix represent?",
                options: ["Techniques", "Procedures", "Tactics", "Tools"],
                answer: 2
            },
            {
                q: "SIEMs apply artificial intelligence techniques to log entries?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 1
            },
            {
                q: "Which component of a syslog message contains the timestamp?",
                options: ["Body", "Header", "Facility", "Severity"],
                answer: 1
            },
            {
                q: "What type of technology prevents a forensic examiner from accidentally corrupting evidence while creating an image of a disk?",
                options: ["Backup system", "Encryption", "Air gap", "Write blocker"],
                answer: 3
            },
            {
                q: "Which evidence source should be collected first when considering the order of volatility?",
                options: ["Hard drive", "Network traffic", "Logs", "Memory contents"],
                answer: 3
            },
            {
                q: "What tool allows you to dump the contents of memory on a Linux system?",
                options: ["dumpmem", "memdump", "memorydump", "memcapture"],
                answer: 1
            },
            {
                q: "Which one of the following is a hashing utility that you can use in your forensic toolkit?",
                options: ["netstat", "wireshark", "shasum", "tcpdump"],
                answer: 2
            },
            {
                q: "Three of these choices are data elements found in NetFlow data. Which is not?",
                options: ["Source IP address", "Destination IP address", "Packet contents", "Source port"],
                answer: 2
            },
            {
                q: "Dan is engaging in a password cracking attack where he uses precomputed hash values. What type of attack is Dan waging?",
                options: ["Bruteforce attack", "Dictionary attack", "Rainbow table attack", "Social engineering attack"],
                answer: 2
            },
            {
                q: "What tool can you use to create a disk image?",
                options: ["DiskCopy", "DiskImage", "dd", "clone"],
                answer: 2
            },
            {
                q: "Which one of the following is a file carving tool?",
                options: ["dd", "grep", "Bulk Extractor", "scp"],
                answer: 2
            },
            {
                q: "The chain of custody must be updated EVERY time someone handles a piece of evidence?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "Software forensics may be used to identify the origin of malware?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "Which one of the following is a commonly used exploitation framework?",
                options: ["Nessus", "Wireshark", "Snort", "Metasploit"],
                answer: 3
            },
            {
                q: "During what phase of ediscovery does an organization share information with the other side?",
                options: ["Collection", "Review", "Production", "Preservation"],
                answer: 2
            },
            {
                q: "Server logs are an example of _____ evidence?",
                options: ["Physical", "Testimonial", "Documentary", "Demonstrative"],
                answer: 2
            },
            {
                q: "What type of investigation would typically be launched in response to a report of high network latency?",
                options: ["Criminal investigation", "Regulatory investigation", "Civil investigation", "Operational investigation"],
                answer: 3
            }
        ]
    },
    {
        title: "Governance, Risk, and Compliance",
        questions: [
            {
                q: "Which two factors are used to evaluate a risk?",
                options: ["Impact and severity", "Likelihood and cost", "Prevalence and impact", "Likelihood and impact"],
                answer: 3
            },
            {
                q: "What is the correct formula for computing the annualized loss expectancy?",
                options: ["ALE = SLE * ARO", "ALE = SLE + ARO", "ALE = SLE / ARO", "ALE = SLE - ARO"],
                answer: 0
            },
            {
                q: "What is the lowest level of classification in the government's classification scheme?",
                options: ["Top Secret", "Secret", "Confidential", "Unclassified"],
                answer: 2
            },
            {
                q: "Which one of the following is NOT one of the major principles of COBIT?",
                options: ["Meeting stakeholder needs", "Covering the enterprise end-to-end", "Applying a single integrated framework", "Enabling a holistic approach"],
                answer: 1
            },
            {
                q: "Where would an organization normally record its risks?",
                options: ["Risk matrix", "Risk register", "Risk report", "Risk assessment"],
                answer: 1
            },
            {
                q: "What data security role is normally filled by a senior-level official who bears overall responsibility for the data?",
                options: ["Data custodian", "Data owner", "Data user", "Data processor"],
                answer: 1
            },
            {
                q: "What is the first step in the NIST risk management framework?",
                options: ["Implement security controls", "Authorize information system", "Assess security controls", "Categorize information system"],
                answer: 3
            },
            {
                q: "Purchasing an insurance policy is an example of which risk management strategy?",
                options: ["Risk acceptance", "Risk avoidance", "Risk mitigation", "Risk transference"],
                answer: 3
            },
            {
                q: "Backups are an example of what category of security control?",
                options: ["Preventive", "Detective", "Corrective", "Compensating"],
                answer: 2
            },
            {
                q: "Risk assessments represent a point-in-time analysis of the risks facing an organization?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 1
            },
            {
                q: "Vendors extend your organization's technology environment. If they handle data on your behalf, you should expect they execute the same degree of care that you would in your own operations?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "Data ownership issues often arise in supplier relationships?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 0
            },
            {
                q: "Audits may be performed by either internal or external entities?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 1
            },
            {
                q: "What type of Service Organization Controls audit is designed for public consumption?",
                options: ["SOC 1", "SOC 2", "SOC 3", "SOC 4"],
                answer: 2
            },
            {
                q: "What type of agreement is used to define availability requirements for an IT service that an organization is purchasing from a vendor?",
                options: ["MOU", "SLA", "BPA", "EULA"],
                answer: 1
            },
            {
                q: "Which element of the security policy framework includes suggestions that are not mandatory?",
                options: ["Standards", "Procedures", "Guidelines", "Controls"],
                answer: 2
            },
            {
                q: "What security principle prevents against an individual having excess security rights?",
                options: ["Least privilege", "Separation of duties", "Need to know", "Defense in depth"],
                answer: 0
            },
            {
                q: "Which one of the following is not one of the GAPP principles?",
                options: ["Integrity", "Transparency", "Availability", "Confidentiality"],
                answer: 0
            },
            {
                q: "What law contains specific requirements for data breaches that occur in the healthcare industry?",
                options: ["SOX", "GLBA", "COPPA", "HIPAA"],
                answer: 3
            },
            {
                q: "ZIP code, date of birth, and gender uniquely identify 87% of people in the United States?",
                options: ["TRUE", "FALSE", "", ""],
                answer: 1
            },
            {
                q: "What data obfuscation technique is intended to be reversible?",
                options: ["Hashing", "Tokenization", "Encryption", "Masking"],
                answer: 1
            },
            {
                q: "What is the name of the practice where a user holds a door open for the individual following them into a building?",
                options: ["Tailgating", "Lock picking", "Bypassing", "Eavesdropping"],
                answer: 0
            },
            {
                q: "What type of security training is specifically designed to educate employees about attack techniques?",
                options: ["Awareness training", "Technical training", "Certification training", "Capture the flag training"],
                answer: 3
            }
        ]
    }
];

// Function to play hover sound when user hooves over chapter selection
function playHoverSound() {
    const hoverSound = document.getElementById("hoverSound");
    hoverSound.play();
}

// Function to play click sound when user clicks over chapter selection
function playClickSound() {
    const clickSound = document.getElementById("clickSound");
    clickSound.play();
}

// Function to reset the quiz-over page
function resetQuizOver() {
    const quizOverPage = document.querySelector(".quiz-over");
    quizOverPage.classList.remove("show");
}

// Function to display a confirmation popup when the back button is clicked
function showConfirmationPopup() {
    const confirmation = confirm("Are you sure you want to leave the quiz? Your progress will not be saved.");
    if (confirmation) {
        // Redirect to the chapter selection page or perform other actions
        // For now, let's assume you want to go back to the chapter selection
        showChapterSelection();
    }
}

// Function to show the chapter selection page
function showChapterSelection() {
    const chapterSelection = document.querySelector(".chapter-selection");
    const quizContainer = document.querySelector(".quiz-container");
    chapterSelection.style.display = "block";
    quizContainer.style.display = "none";
}

// Update the questions and totalQuestionsSpan based on the selected chapter
function changeChapter(selectedChapterIndex) {
    if (selectedChapterIndex >= 0 && selectedChapterIndex < chapters.length) {
        selectedChapter = selectedChapterIndex;
        let currentChapter = chapters[selectedChapter];

        answeredQuestions = [];
        score = 0;
        index = 0;
        currentQuestions = currentChapter.questions; // Remove 'let' keyword to update the global array

        randomQuestion();
        answersTracker();
        resetQuizOver();

        const chapterSelection = document.querySelector(".chapter-selection");
        const quizContainer = document.querySelector(".quiz-container");
        chapterSelection.style.display = "none";
        quizContainer.style.display = "block";

        // Show the back button inside the quiz container
        const backButton = document.querySelector(".back-button");
        backButton.style.display = "block";

        const quizTitle = `Quiz ${selectedChapter}: ${currentChapter.title}`;
        document.querySelector(".quiz-title h2").innerHTML = quizTitle;
    } else {
        console.error("Invalid selectedChapterIndex:", selectedChapterIndex);
    }
}

function answersTracker() {
    // Find the selected chapter in the chapters array
    const selectedChapterObj = chapters[selectedChapter];

    let totalQuestionsInChapter = 0; // Initialize to 0

    if (selectedChapterObj) {
        // Get the number of questions in the selected chapter

        totalQuestionsInChapter = selectedChapterObj.questions.length;
    }

    // Clear the existing answer tracker
    answersTrackerContainer.innerHTML = '';

    // Create circles for each question in the selected chapter
    for (let i = 0; i < totalQuestionsInChapter; i++) {
        const div = document.createElement("div");
        answersTrackerContainer.appendChild(div);
    }
}

function load() {
    questionNumberSpan.innerHTML = index + 1;

    // Update the totalQuestionsSpan with the number of questions in the current chapter
    totalQuestionsSpan.innerHTML = currentQuestions.length;

    const currentQuestion = currentQuestions[currentIndex];

    const selectedChapterObj = chapters[selectedChapter];
    const quizTitle = `Quiz ${selectedChapter}: ${selectedChapterObj.title}`;
    document.querySelector(".quiz-title h2:first-child").innerHTML = quizTitle;

    question.innerHTML = currentQuestion.q;
    opt1.innerHTML = currentQuestion.options[0];
    opt2.innerHTML = currentQuestion.options[1];
    opt3.innerHTML = currentQuestion.options[2];
    opt4.innerHTML = currentQuestion.options[3];
}

// Function to update the answers tracker elements
function updateAnswersTracker(status) {
    const currentAnswerTracker = answersTrackerContainer.children[index];
    if (status === "correct") {
        currentAnswerTracker.classList.add("correct");
    } else if (status === "wrong") {
        currentAnswerTracker.classList.add("wrong");
    } else if (status === "selected") {
        currentAnswerTracker.classList.add("selected");
    }
}

// Check if selected answer is correct or wrong
function check(element) {
    if (element.id == currentQuestions[currentIndex].answer) {
        element.className = "correct";
        updateAnswersTracker("correct"); // Call updateAnswersTracker here
        score++;
    } else {
        element.className = "wrong";
        updateAnswersTracker("wrong"); // Call updateAnswersTracker here
    }
    disableClick();
}

// Make sure the user selected an item before clicking on the Next button
function validate() {
    if (!options[0].classList.contains("disabled")) {
        alert("Please select an option");
    } else {
        updateAnswersTracker("selected"); // Update tracker before incrementing index
        randomQuestion();
        enableClick();

        // Check if all questions are answered
        if (answeredQuestions.length === currentQuestions.length) {
            // Delay showing the quiz-over box
            setTimeout(() => {
                quizOver();
            }, 2000); // Delay in milliseconds (2 seconds)
        }
    }
}

// Listener function for click event on Next button
function next() {
    if (currentIndex < currentQuestions.length) {
        validate();
        index++; // Increment the index
        questionNumberSpan.innerHTML = index + 1; // Update the question number
    } else {
        quizOver();
    }
}

//Function to disable click for the options
function disableClick() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add("disabled")

        if (options[i].id == currentQuestions[currentIndex].answer) {
            options[i].classList.add('correct');
        }
    }
}

//Function to reanable click in the options
function enableClick() {
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("disabled", "correct", "wrong")

    }
}

// Function to select a random question
function randomQuestion() {
    while (answeredQuestions.length < currentQuestions.length) {
        let randomNumber = Math.floor(Math.random() * currentQuestions.length);
        if (!answeredQuestions.includes(randomNumber)) {
            currentIndex = randomNumber;
            load();
            answeredQuestions.push(randomNumber);
            return;
        }
    }
    // If all questions are answered, trigger quizOver()
    quizOver();
}

function quizOver() {
    const quizOverBox = document.querySelector(".quiz-over .box");

    quizOverBox.addEventListener("click", function (event) {
        // Prevent click events from propagating to parent elements
        event.stopPropagation();
    });

    // Attach the tryAgain() function to the "Try Again!" button
    const tryAgainButton = document.querySelector(".quiz-over .try-again-button");
    tryAgainButton.addEventListener("click", function () {
        tryAgain();
        quizOverBox.style.display = "none"; // Hide the quiz-over container
    });

    // Attach the reviewAnswers() function to the "Review Answers" button
    const reviewAnswersButton = document.querySelector(".quiz-over .review-answers-button");
    reviewAnswersButton.addEventListener("click", function () {
        reviewAnswers();
        quizOverBox.style.display = "none"; // Hide the quiz-over container
    });

    document.querySelector(".quiz-over").classList.add("show");
    correctAnswersSpan.innerHTML = score;
    totalQuestionsSpan2.innerHTML = currentQuestions.length;
    percentageSpan.innerHTML = Math.round((score / currentQuestions.length) * 100) + "%";
    index = 0; // Reset the index to 0
    questionNumberSpan.innerHTML = index + 1; // Update the question number display
}


function reviewAnswers() {
    const quizOverContainer = document.querySelector(".quiz-over");
    const reviewContainer = document.querySelector('.review-container');

    // Toggle the visibility of the review container
    if (reviewContainer.style.display === 'none' || reviewContainer.style.display === '') {
        reviewContainer.style.display = 'block';
        populateReviewAnswers(reviewContainer); // Populate the content when showing
    } else {
        reviewContainer.style.display = 'none';
    }

    // Hide the quiz-over container
    quizOverContainer.style.display = 'none';
}

function populateReviewAnswers(container) {
    container.innerHTML = ''; // Clear previous content

    for (let i = 0; i < answeredQuestions.length; i++) {
        const questionIndex = answeredQuestions[i];
        const question = currentQuestions[questionIndex];

        const questionDiv = document.createElement('div');
        questionDiv.className = 'review-question';

        const questionText = document.createElement('p');
        questionText.textContent = question.q;
        questionText.style.fontWeight = 'bold'; // Make the question text bold
        questionDiv.appendChild(questionText);

        const userAnswerText = document.createElement('p');
        const userAnswerIndex = question.userAnswer; // Get the user's answer index
        userAnswerText.textContent = 'Your Answer: ' + question.options[userAnswerIndex];
        userAnswerText.style.color = userAnswerIndex === question.answer ? 'green' : 'red'; // Green if correct, red if wrong
        questionDiv.appendChild(userAnswerText);

        const correctAnswerText = document.createElement('p');
        correctAnswerText.textContent = 'Correct Answer: ' + question.options[question.answer];
        questionDiv.appendChild(correctAnswerText);

        container.appendChild(questionDiv);
    }
}



function tryAgain() {
    window.location.reload();
}

// Assuming there's an event listener for chapter selection
function handleChapterSelection(event) {
    // Update the selectedChapter based on user selection
    const selectedChapterIndex = parseInt(event.target.dataset.chapter, 10);
    changeChapter(selectedChapterIndex);
}

// Attach event listeners to chapter selectors
function attachChapterSelectionListeners() {
    const chapterSelectors = document.querySelectorAll(".chapter-selector");
    chapterSelectors.forEach(selector => {
        selector.addEventListener("click", handleChapterSelection);
    });
}

// Restart the quiz and load currentQuestions based on selected chapter
window.onload = function () {
    attachChapterSelectionListeners(); // Attach event listeners to chapter selectors
    answersTracker(); // Set up answers tracker
};