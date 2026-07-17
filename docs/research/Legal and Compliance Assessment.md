# **Comprehensive Legal and Compliance Assessment for EdTech Audio Processing and Literacy Assessment Systems in Philippine Public Schools**

## **Introduction and Regulatory Architecture**

The deployment of educational technology (EdTech) that processes the biometric data and educational records of minors in the Philippines exists at a highly regulated intersection of data privacy, intellectual property, child protection, and state educational governance. The initiative to utilize a mobile application equipped with on-device speech recognition to evaluate the reading fluency of public elementary school children (ages 5–12) and subsequently transmit text-based analytical scores to a teacher dashboard presents significant pedagogical potential for the Department of Education (DepEd). However, this architectural model simultaneously triggers rigorous and non-negotiable compliance obligations under the Data Privacy Act of 2012 (Republic Act No. 10173), the Intellectual Property Code of the Philippines (Republic Act No. 8293), the Special Protection of Children Against Abuse, Exploitation and Discrimination Act (Republic Act No. 7610), and a multitude of administrative issuances from the National Privacy Commission (NPC) and the Department of Information and Communications Technology (DICT).  
This report provides an exhaustive, expert-level legal and operational analysis of the proposed system architecture. It evaluates the fundamental data privacy classification of children's voice recordings and generated academic scores, the complex mechanics of obtaining valid, legally binding consent within the public school system, and DepEd's stringent data governance requirements. Furthermore, it assesses the precise risk mitigation achieved through edge-based, on-device processing, alongside the severe intellectual property constraints surrounding the digitization and commercialization of standardized literacy assessments such as the Philippine Informal Reading Inventory (Phil-IRI) and the Comprehensive Rapid Literacy Assessment (CRLA). The analysis culminates in a ranked compliance checklist and an operational blueprint for a legally safe, minimal viable pilot design tailored to the Philippine regulatory landscape.

## **1\. The Data Privacy Act (RA 10173\) and the Processing of Minors' Data**

The Data Privacy Act of 2012 (DPA) and its Implementing Rules and Regulations (IRR) establish the foundational framework governing the collection, processing, storage, and transmission of personal data in the Philippines. For an EdTech startup operating within public schools, understanding the precise statutory classification of the data being ingested and generated is the critical first step in determining the applicable regulatory burden.

### **Statutory Classification of Voice Recordings and Assessment Scores**

Under the DPA, data is bifurcated into standard "personal information" and "sensitive personal information" (SPI), with the latter subject to substantially stricter processing prohibitions, heightened security mandates, and heavier penal sanctions. The initial capture of a child's voice constitutes the collection of biometric data. The NPC, referencing Republic Act No. 10367, explicitly defines biometrics as quantitative analysis providing a positive identification of an individual, which definitively includes voice prints, fingerprints, facial scans, and iris patterns. While biometric data can uniquely identify an individual and is generally treated as personal information, its classification escalates based on context and combination with other identifiers. Because the proposed application captures the voice recording specifically to evaluate and generate a metric regarding the child's educational proficiency, the context is inherently sensitive.  
Furthermore, the output of the on-device processing—the text-based reading scores, fluency metrics, and proficiency categorizations—unequivocally constitutes Sensitive Personal Information. The DPA and recent NPC jurisprudence, specifically NPC Advisory Opinion No. 2025-017, explicitly classify information pertaining to an individual's education, including academic assessments, grade breakdowns, performance evaluations, and teacher comments, as SPI. Therefore, even though the biometric audio is discarded at the edge, the payload transmitted to the cloud dashboard constitutes the sensitive personal information of highly vulnerable data subjects.

| Data Element | DPA Classification | Justification under Philippine Law |
| :---- | :---- | :---- |
| **Raw Voice Audio** | Personal Information / Biometric | RA 10367 defines voice as a biometric identifier capable of positive identification. |
| **Student Name/ID** | Personal Information | Directly ascertains the identity of the individual learner. |
| **Reading Fluency Score** | Sensitive Personal Information | Section 3 of RA 10173 classifies any information regarding an individual's education or academic evaluation as SPI. |
| **Combined Dashboard Data** | Sensitive Personal Information | The aggregation of a student's identity with their educational performance profile triggers the highest level of statutory protection. |

### **NPC Guidance on Minors, EdTech, and the Lawful Basis for Processing**

The NPC has consistently emphasized that the processing of minors' data requires extraordinary safeguards. Children, particularly those between the ages of 5 and 12, are legally incapable of providing valid consent on their own behalf. NPC PHE Bulletin No. 16 and the Data Privacy Council Education Sector Advisory No. 2020-1 outline strict protocols for digital learning and data collection in schools, emphasizing transparency, proportionality, and the absolute necessity of parental involvement.  
To process personal data lawfully, an entity must establish a legal basis under Section 12 (for personal information) or Section 13 (for sensitive personal information) of the DPA. In the educational sector, schools frequently rely on the "legitimate interest" of the institution or the fulfillment of a contract (e.g., the enrollment agreement) for routine administrative processing. However, the DPA's provision for legitimate interest strictly applies only to standard personal information; it does not extend to Sensitive Personal Information.  
For the processing of SPI—which includes the generation and transmission of the children's reading scores—Section 13 of the DPA demands explicit, specific, and informed consent from the data subject prior to processing, barring narrow statutory exceptions such as medical emergencies or direct legal mandates. While DepEd has a constitutional and statutory mandate to provide basic education and assess learners, the deployment of a third-party commercial application by a startup is not a statutory mandate that overrides fundamental privacy rights. Consequently, the only viable, legally defensible lawful basis for this specific data processing activity is the explicit, written consent of the parents or legal guardians.

### **The Dynamics of Personal Information Controllers (PIC) vs. Processors (PIP)**

The distinction between a Personal Information Controller (PIC) and a Personal Information Processor (PIP) is critical for determining legal liability, regulatory accountability, and contractual obligations. A PIC controls the collection, holding, processing, or use of personal information, dictating the ultimate purpose and means of the processing activity. Conversely, a PIP acts strictly on the documented instructions of the PIC and possesses no independent authority over the data.  
When a public school, operating under the jurisdiction of DepEd, utilizes a third-party mobile app to facilitate mandatory or supplementary reading assessments, the school and DepEd remain the PICs. They determine the educational purpose (evaluating student literacy) and the means (deploying the startup's application). In this ecosystem, the startup providing the app operates exclusively as the PIP.  
This legal classification imposes severe constraints on the startup's operational latitude. As a PIP, the startup cannot lawfully repurpose the ingested data—even if stripped of direct identifiers—for its own independent commercial objectives, such as proprietary algorithm training, machine learning model refinement, or product monetization, without explicit, secondary contractual authorization from DepEd and corresponding secondary consent from the parents. The startup's legal mandate is entirely derivative of the school's administrative authority, meaning any deviation from the school's strict instructional parameters constitutes a direct violation of the DPA, exposing the startup to civil and criminal liability.

## **2\. Consent Mechanics and the Doctrine of Special Parental Authority in Public Schools**

Obtaining valid consent in the Philippine public school system requires navigating the intersection of data privacy law and family law. The mere logistical deployment of an app in a classroom does not equate to lawful data processing; the foundational legal permissions must be impeccably structured.

### **The Limits of Special Parental Authority**

Under Articles 218 and 219 of the Family Code of the Philippines, schools, administrators, and teachers exercise "special parental authority" (in loco parentis) over minor students while they are under school supervision, instruction, or custody. This authority creates a heightened duty of care and solidary liability for damages caused by or to the unemancipated minor.  
However, a critical legal distinction must be made: special parental authority is fundamentally a doctrine of liability, physical supervision, and discipline; it is not a mechanism for data privacy bypass. A school principal or classroom teacher cannot invoke in loco parentis to unilaterally waive the fundamental constitutional and statutory privacy rights of their students. The authority to consent to the processing of a minor's sensitive personal information remains exclusively vested in the biological parents or legal judicial guardians. Therefore, the school cannot simply sign a master agreement with the startup and mandate student participation without individual parental consent.

### **DepEd Orders on Consent, Research, and Third-Party Data Collection**

DepEd enforces strict, standardized mechanisms for obtaining consent for any activity involving the recording, photographing, or digital profiling of learners. Pursuant to DepEd Order No. 40, s. 2012 (the Child Protection Policy) and subsequent reiterative memoranda (such as OM-OUOPS-2024-05-03942), any collection of audio, video, or photographic data requires an explicit, standardized "Consent, Waiver, Indemnity and Release Form" executed by the parent or guardian.  
These directives, heavily influenced by the Learner Rights and Protection Office, mandate an absolute "opt-in" mechanism. Philippine public schools cannot lawfully rely on implied consent, "opt-out" mechanisms, or passive notification strategies (e.g., sending a circular home stating that the app will be used unless the parent explicitly objects). The DPA's Implementing Rules and Regulations explicitly reject silence, inaction, or pre-ticked boxes as valid forms of consent, demanding an unambiguous indication of will.

### **Operationalizing Consent in EdTech Pilots**

Comparable EdTech initiatives and institutional research projects operating within DepEd strictly utilize comprehensive opt-in consent forms tailored to the specific digital intervention. For the proposed reading assessment app, the consent instrument must be meticulously drafted to ensure it is "informed" under Section 16 of the DPA. The form must clearly articulate:

1. **The Specific Data Collected:** Explicitly stating that the child's voice will be temporarily recorded, and that academic reading scores will be generated.  
2. **The Exact Purpose:** Defining that the processing is strictly for automated fluency assessment and educational intervention mapping.  
3. **The Data Flow and Security:** Detailing that the audio is processed locally on the device and immediately destroyed, with only text-based scores transmitted to the authorized teacher.  
4. **The Identity of the PIP:** Clearly identifying the startup as the third-party processor acting on behalf of the school.  
5. **Rights of the Data Subject:** Outlining the retention period and the absolute right of the parents to withdraw consent at any time without prejudice.

Crucially, if a parent refuses to execute the consent form, the school must provide an alternative, non-digital means of conducting the reading assessment (such as a traditional, manual Phil-IRI assessment administered by the teacher). A student cannot be academically penalized or excluded from educational evaluation merely because their parent exercised a fundamental statutory privacy right.

## **3\. DepEd Data Governance and the Integration of Third-Party Systems**

Operating a digital system within the Philippine public school ecosystem requires strict adherence to DepEd's overarching data governance architecture. The Department has historically maintained a highly protective stance regarding learner data, recognizing the immense risks of unauthorized commercial exploitation.

### **DepEd's Data Privacy Manual and the Learner Information System (LIS)**

DepEd maintains comprehensive data governance protocols, anchored by the DepEd Data Privacy Manual and the operational frameworks surrounding the Learner Information System (LIS). The LIS serves as the centralized, authoritative repository for all student records, enrollment data, and historical academic performance metrics. DepEd highly restricts third-party API access to the LIS to prevent unauthorized data mining, profiling, and the lateral exfiltration of sensitive demographic information.  
If the startup's teacher dashboard operates independently of the LIS, it functions technically as a standalone "shadow IT" system. While standalone systems are easier for startups to rapidly deploy, maintaining isolated databases containing student grades (Sensitive Personal Information) poses severe regulatory risks for the participating school. DepEd Division Memoranda frequently and explicitly remind school administrators and teachers that posting, transmitting, or storing learner data outside of highly secure, officially approved platforms is strictly prohibited.

### **The Mandate for Data Sharing and Outsourcing Agreements**

For a public school to lawfully utilize a third-party application that processes learner data, a formal legal instrument must bridge the PIC (the school or DepEd Division) and the PIP (the startup). The NPC heavily regulates these relationships to ensure unbroken accountability.  
Under NPC Circular 2020-03, if two entities act as independent controllers, a Data Sharing Agreement (DSA) is required. However, because the startup provides a processing service directly to the school and does not control the data for its own purposes, an Outsourcing Agreement or a Data Processing Agreement (DPA) is the correct legal instrument. This agreement is not a mere formality; it is a statutory requirement under Section 43 of the DPA IRR.  
The Outsourcing Agreement must contractually bind the startup to implement technical, physical, and organizational security measures equivalent to those required of the government. It must include strict confidentiality clauses, grant audit rights to DepEd or the specific Schools Division Office, and establish immediate breach notification protocols mandating that the startup inform the school within 24 hours of any suspected data compromise.

### **The Microsoft Reading Progress Precedent**

The deployment of Microsoft's Reading Progress tool offers the most direct and instructive legal and operational precedent for the startup's ambitions. Over recent years, Microsoft and DepEd have successfully scaled Reading Progress and Reading Coach across multiple Philippine school divisions (including extensive pilots in Bais, Dumaguete, and Cabanatuan) to automate reading fluency checks for tens of thousands of learners.  
Microsoft achieved this massive nationwide deployment legally because Reading Progress is not a standalone shadow IT app; it is integrated directly into Microsoft Teams for Education and the broader Microsoft 365 ecosystem. DepEd already possesses enterprise-level agreements, comprehensive Outsourcing Agreements, and fully vetted data privacy frameworks established with Microsoft at the national level. In this context, Microsoft acts as a heavily audited PIP operating seamlessly within DepEd's authorized walled digital garden. The audio recorded by students using Reading Progress is processed, analyzed, and stored within compliance boundaries that DepEd's central legal and IT departments have already rigorously approved.  
For a student startup to achieve similar operational legality without the benefit of a pre-existing national enterprise agreement, it must start at the local level. The startup must establish a formal Outsourcing Agreement at the specific Schools Division level (subject to the approval of the Schools Division Superintendent), subjecting its system architecture to the same rigorous security audits and privacy impact assessments required of major enterprise vendors before a single student's voice is recorded.

## **4\. The Edge Computing Advantage: On-Device Processing and Residual Compliance**

The architectural decision to process the audio entirely on the edge (on-device) and delete the audio file immediately after the text-based score is generated represents a highly sophisticated implementation of "privacy-by-design." However, understanding the exact legal boundaries of this advantage is critical to avoiding compliance blind spots.

### **Minimization of Biometric and Interception Risks**

Under the DPA's core principle of proportionality, personal data should be processed only if the intended purpose could not reasonably be fulfilled by other, less intrusive means, and data must not be retained longer than absolutely necessary. By executing the speech-to-text machine learning models locally on the mobile hardware, the startup prevents the biometric voice data from ever leaving the device or resting on a remote cloud server.  
This architectural choice completely eliminates the risk of biometric data interception in transit, man-in-the-middle attacks on the audio stream, or catastrophic server-side breaches of highly sensitive voice print databases. Consequently, the startup successfully avoids the immense regulatory and technical burden of securing a centralized biometric database—an activity that the NPC monitors stringently and penalizes heavily in the event of a breach.

### **Residual Statutory and Administrative Obligations**

Despite this significant architectural advantage, the startup is emphatically not absolved of overall DPA compliance. The payload that is ultimately transmitted to the cloud-based teacher dashboard—comprising the student's name, unique identifier, calculated reading score, and fluency categorization—remains Sensitive Personal Information (SPI). Consequently, a suite of mandatory regulatory requirements continues to apply to the startup's operations.

| DPA Regulatory Requirement | Applicability to Startup | Legal and Operational Justification |
| :---- | :---- | :---- |
| **NPC System Registration (NPCRS)** | **Mandatory (Conditional)** | Under NPC Circular 2022-04, registration of a Data Processing System is mandatory if an entity employs 250+ persons OR processes the sensitive personal information of 1,000 or more individuals. If the pilot scales beyond 1,000 students, the startup is legally obligated to register its dashboard database with the NPC. |
| **Data Protection Officer (DPO)** | **Mandatory** | The formal appointment and registration of a DPO is required alongside system registration. The DPO serves to oversee internal compliance, conduct impact assessments, and act as the official liaison with the NPC. |
| **Privacy Impact Assessment (PIA)** | **Mandatory** | As a PIP processing the SPI of minors, conducting a formal PIA is required to document the data lifecycle, identify risks, and formalize mitigation strategies (such as detailing the on-device processing mechanism). |
| **Breach Notification Protocols** | **Mandatory** | Under NPC Circular 16-03, if the text-based scores and student identities are exposed due to a dashboard vulnerability or unauthorized access, the startup must notify the PIC (DepEd) immediately. DepEd is then statutorily required to notify the NPC and the affected data subjects within 72 hours of discovering the breach. |
| **Data Retention Policies** | **Mandatory** | The startup must implement strict, automated data disposal policies. Once the academic year concludes or the Outsourcing Agreement terminates, the startup must permanently purge the scores from its servers, as indefinite retention of SPI is prohibited. |

In summary, the on-device processing brilliantly mitigates the *severity* of a potential breach (as exposing a text-based reading score is objectively less damaging than exposing a raw biometric voiceprint), but it does not alter the fundamental *classification* of the remaining transmitted data as sensitive. It does not exempt the startup from institutional compliance thresholds regarding registration, DPO appointment, and breach readiness.

## **5\. Intellectual Property Constraints in Literacy Assessment Materials (Phil-IRI & CRLA)**

The core pedagogical utility of the proposed application relies entirely on the integration of validated reading passages and standardized scoring rubrics. In the Philippine public education system, the two primary frameworks utilized for assessing early-grade literacy are the Philippine Informal Reading Inventory (Phil-IRI) and the Comprehensive Rapid Literacy Assessment (CRLA). However, the intellectual property (IP) constraints surrounding these instruments dictate precisely how a commercial entity or student startup can lawfully utilize them in a digital application.

### **The Phil-IRI Framework: Works of the Philippine Government**

The Phil-IRI passages, diagnostic forms, and administrative manuals are officially promulgated by the Department of Education under DepEd Order 14, s. 2018\. Under the Philippine Intellectual Property Code (RA 8293), Section 176 explicitly dictates the copyright status of such materials: "No copyright shall subsist in any work of the Government of the Philippines".  
Because the Phil-IRI is a government work, it resides in the public domain for standard educational, non-profit, and administrative use. However, Section 176 contains a critical, heavily enforced caveat: "prior approval of the government agency or office wherein the work is created shall be necessary for exploitation of such work for profit".  
If the student startup intends to commercialize the application—whether by selling software-as-a-service (SaaS) subscriptions to private schools, charging DepEd divisions for premium dashboard analytics, or raising venture capital based on user monetization metrics—reproducing the exact Phil-IRI passages within the app constitutes exploitation for profit. Consequently, the startup would require explicit prior written approval from DepEd. Furthermore, even if approval is granted, any reproduction must accurately attribute the work to DepEd and cannot distort or mutilate the integrity of the standardized assessment.

### **The CRLA Framework: Creative Commons and the NonCommercial Blocker**

The CRLA presents a far more restrictive and complex IP environment. Unlike the wholly government-owned Phil-IRI, the CRLA instruments were developed collaboratively by DepEd, the United States Agency for International Development (USAID), RTI International, and other non-governmental organizations under the ABC+ Advancing Basic Education in the Philippines project.  
An extensive analysis of the official CRLA assessment materials reveals that they are strictly licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)**. This specific open-source license explicitly permits users to copy, distribute, transmit, and adapt the work for educational purposes, but it *expressly and absolutely prohibits its use for commercial purposes*.  
In international copyright jurisprudence and Creative Commons definitions, "commercial use" is defined broadly as any use primarily intended for, or directed toward, commercial advantage or monetary compensation. If the startup operates as a for-profit corporate entity, plans to monetize the app in the future, or uses the CRLA text data to build a proprietary, closed-source commercial speech algorithm, it is strictly violating the CC BY-NC 4.0 license. Unlike a government work where commercial approval might be granted administratively by DepEd, circumventing a CC BY-NC license requires identifying the original copyright holders (RTI International/USAID) and negotiating a separate, bespoke commercial license—a process that is highly improbable, costly, and time-consuming for a student startup.

### **Navigating the Idea-Expression Dichotomy**

While the exact textual reading passages (the stories the children read) and the bespoke visual layouts of the Phil-IRI and CRLA diagnostic forms are protected by copyright (or restricted by CC licenses), the underlying *methods* of assessment are not.  
Under Philippine IP law, ideas, procedures, systems, methods of operation, concepts, and mathematical principles are strictly uncopyrightable. Therefore, a commercial application can lawfully extract and utilize the underlying pedagogical mechanics without infringing on copyright. Specifically, the startup can lawfully:

1. **Adopt the Methodology:** Utilize the mathematical formulas for measuring words-per-minute (WPM), calculating miscue percentages, and determining reading speed.  
2. **Use Category Nomenclature:** Employ the category names for reading proficiency. Short phrases and broad concepts such as "Frustration," "Instructional," and "Independent" (from Phil-IRI) or "Grade Ready," "Light Refresher," and "Full Refresher" (from CRLA) lack the requisite originality to be copyrighted.  
3. **Auto-Generate Reports:** Design original dashboard interfaces that auto-generate diagnostic reports based on these uncopyrightable mathematical rubrics, provided the visual design does not plagiarize the exact layout of the official DepEd forms.

To remain legally unassailable and commercially viable, the startup must author its own original reading passages (or source public domain texts) that correspond to the Lexile complexity or grade-level difficulty of the CRLA/Phil-IRI rubrics, rather than scraping, digitizing, and utilizing the official, CC-restricted texts.

## **6\. Overlapping Statutory Frameworks: Child Protection and Cloud Security**

Beyond data privacy and intellectual property, the deployment of a recording device in a classroom containing vulnerable minors intersects with severe criminal statutes and strict government IT infrastructure policies.

### **The Special Protection of Children Act (RA 7610\) and Cybercrime Intersections**

Republic Act No. 7610, the Special Protection of Children Against Abuse, Exploitation and Discrimination Act, provides heightened, aggressive legal protection for minors. While the law is primarily recognized for targeting child prostitution and trafficking, its broad catch-all provisions regarding "other acts of neglect, abuse, cruelty or exploitation and other conditions prejudicial to the child's development" (Section 10\) have been utilized by prosecutors to address the unauthorized, exploitative recording or photographing of minors.  
If a severe vulnerability in the application allows malicious actors to intercept the children's audio recordings, or if a teacher misuses the app to record children outside the strict context of a reading assessment (e.g., for disciplinary shaming or voyeurism), the startup and the school could face severe criminal liability under RA 7610, often in conjunction with the Cybercrime Prevention Act of 2012 (RA 10175).  
The architectural decision to mandate strict on-device processing and the immediate, unrecoverable deletion of the audio file is the most robust technical defense against this specific liability vector. By ensuring the audio never persists on a server, the startup removes the digital asset that could be exploited, thereby drastically reducing the attack surface for RA 7610 violations.

### **The DICT Cloud First Policy and Data Residency Mandates**

Should the startup deploy cloud infrastructure to host the teacher dashboard and synchronize the text-based scores across devices, it must adhere to the Department of Information and Communications Technology (DICT) regulations. The DICT "Cloud First Policy" (Department Circular No. 2017-002, as subsequently amended by Circular No. 2020-010) governs how government data (which encompasses public school records) is hosted, classified, and secured.  
Under the amended DICT policy, government data is classified into tiers based on sensitivity and the potential impact of unauthorized disclosure. Student educational records constitute "Sensitive Government Data" (or "Above-Sensitive" depending on the specific division's classification). The DICT mandates that while sensitive data may be stored in the cloud, government agencies and their contractors must utilize accredited Cloud Service Providers (CSPs) that meet stringent security baselines.  
Furthermore, if the startup opts to utilize offshore cloud servers (e.g., AWS US-East, Azure global regions, or cheaper foreign hosting alternatives) to save costs, it must comply with complex cross-border data transfer rules. The NPC mandates that PICs and PIPs utilizing offshore infrastructure remain fully accountable for the data and must ensure the foreign cloud provider offers a comparable level of statutory protection (such as ISO 27001 certification and adherence to recognized frameworks like the ASEAN Model Contractual Clauses).  
To streamline compliance, pass DepEd IT audits, and avoid the legal complexities of cross-border data sovereignty issues, the startup should host its dashboard database locally within a Philippine data center or utilize a DICT-accredited global cloud provider region that is formally recognized and vetted by the Philippine government.

## **7\. Strategic Conclusions and the Operational Pilot Blueprint**

### **Compliance Checklist Ranked by Severity**

The following checklist categorizes the startup's legal obligations from existential operational blockers to manageable technical requirements, providing a roadmap for legal resource allocation:

| Severity Level | Legal Issue / Compliance Requirement | Strategic Mitigation Strategy |
| :---- | :---- | :---- |
| **Critical Blocker** | **CRLA Copyright Restriction (CC BY-NC 4.0).** Using exact CRLA textual passages in a commercial or proprietary application is illegal without a bespoke license. | Generate original reading passages that mathematically match the CRLA rubrics/difficulty, or pivot entirely to public domain texts. Do not digitize CRLA passages. |
| **Critical Blocker** | **Lack of Explicit Parental Consent.** Processing minor SPI without consent violates the DPA. | Implement mandatory, paper-based DepEd opt-in consent forms signed by parents before any child uses the app. Implied consent is legally invalid. |
| **High Risk** | **Operating as PIP without an Outsourcing Agreement.** Processing DepEd data without a contract exposes the startup to regulatory action. | Execute a formal Data Processing/Outsourcing Agreement with the participating school principal or Division Superintendent prior to deployment. |
| **High Risk** | **Failure to Register with the NPC.** Processing 1,000+ sensitive records without NPCRS registration triggers administrative penalties. | Appoint a certified DPO and register the Data Processing System via the NPCRS portal before the pilot scales to hit the 1,000-student threshold. |
| **Manageable** | **Phil-IRI Commercial Use.** Section 176 requires prior approval for profit exploitation of government works. | Seek formal administrative approval from DepEd for the digitization of Phil-IRI, or rely exclusively on proprietary/original content. |
| **Manageable** | **Cloud Security and DICT Compliance.** The DICT requires accredited hosting for sensitive public data. | Host the dashboard on a reputable, DICT-accredited cloud provider ensuring AES-256 encryption at rest and in transit. |

### **The Riskiest Legal Assumption**

The single riskiest legal assumption embedded in the startup's current operational plan is the belief that **because the audio is processed completely on-device and immediately deleted, DPA compliance obligations are effectively bypassed.**  
While ephemeral, edge-based audio processing is a superb security feature that eliminates biometric storage risks and RA 7610 vulnerabilities, the output—the text-based reading score and fluency categorization linked to a student's name—remains Sensitive Personal Information under Philippine law. The startup is still acting as a Personal Information Processor handling the educational records of vulnerable minors. Consequently, all stringent DPA requirements—including explicit parental consent, formal Outsourcing Agreements, NPC registration thresholds, and 72-hour breach notification protocols—apply with full regulatory force to the text data resting on the cloud-based teacher dashboard.

### **Minimal Legally-Safe Pilot Design**

To deploy a legally robust, compliant pilot in a Philippine public school, the startup must execute the following meticulously structured consent and data flows:  
**Phase 1: Institutional Alignment and Contracting**

1. Draft a formal Outsourcing Agreement clearly defining the public school as the Personal Information Controller (PIC) and the startup as the Personal Information Processor (PIP).  
2. Include binding technical stipulations confirming that all audio is processed entirely on the edge (on-device) and immediately purged from RAM, with zero audio transmission to the cloud.  
3. Ensure the school principal or the relevant Schools Division Superintendent signs the agreement, granting authorization to operate within the specific division.

**Phase 2: The Opt-In Consent Flow**

1. Distribute physical, standardized "Consent, Waiver, Indemnity, and Release" forms to the parents of the target students. The form must specify the exact data lifecycle (voice capture \-\> on-device transcription \-\> immediate deletion \-\> text score uploaded to the teacher dashboard).  
2. The classroom teacher collects, verifies, and logs the signed forms.  
3. The mobile application's interface must include a hard digital checkpoint where the teacher explicitly confirms: *"I verify that a signed parental consent form is on file for this specific student,"* before the microphone can be activated for the assessment.

**Phase 3: The Data Flow and Content Execution**

1. The app utilizes original reading passages authored by the startup, completely avoiding the reproduction of CC BY-NC 4.0 CRLA texts and unapproved Phil-IRI passages.  
2. The student reads into the mobile device; speech-to-text machine learning processing occurs natively on the hardware.  
3. The audio file is immediately wiped from the device memory.  
4. The generated text score (e.g., "75 WPM, 90% Accuracy \- Light Refresher") is encrypted in transit (AES-256) and uploaded to a secure, DICT-accredited cloud database.  
5. The dashboard displays the scores strictly to the authorized teacher through role-based access controls, ensuring no public posting or social media sharing of the academic metrics occurs, thereby preserving the dignity, privacy, and statutory rights of the minor data subjects.

