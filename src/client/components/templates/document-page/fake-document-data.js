// Charles,
// i have been working to figure out what kind of object we need to make these document pages work
// since you are building the facade portion, I will hardcode an object locally on the client
// i have based this object on a) what is in the wireframe and b) what the json api returns from Drupal
// i have tried to keep the key names similar to what the api returns, but some may have to be specifically formatted
// your endpoint does not necessarily need to return this exact object format / structure. But the DATA in this object is necessary for the document page

// below are some notes on the api response that might be useful to you when building the endpoint

//NOTES
// summary: the summary can have double quotes in the string, so that will need to be handled. I would expect the same for the Body. It will need to be sanitized.
// activity: i have not seen this property used anywhere in the wireframe... but it's in the form when creating a document
// some of these properties are nested deep...
// THE URL IS NOT WORKING... it does not point to a pdf... "http://content.sba.fun/sites/default/files/2017-07/serv_tools_sops_1007_1_0.pdf"
// we need to be able to handle null values for effective / expiration dates and version as well

// I AM OMITING "RELATED DOCUMENTS" FROM THIS OBJECT BECAUSE IT HAS NOT BEEN CONFIGURED
// related documents is not neccessary for the "main document" page I am building
// BUT this endpoint will need to return them at some point

var documentData = [
  {
    office: {
      title: "Office of esse duis",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Thu Jun 01 2017 23:38:56 GMT+0000 (UTC)",
        effectiveDate: "Wed Mar 17 2010 20:05:00 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sun Jun 25 2017 04:59:32 GMT+0000 (UTC)",
        effectiveDate: "Tue Jan 16 2001 05:39:27 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Thu Jul 13 2017 17:38:41 GMT+0000 (UTC)",
        effectiveDate: "Thu Mar 30 2000 22:01:35 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC", "8(a)"],
    body:
      "<p>Eiusmod amet et sunt mollit anim laborum id in mollit nisi qui officia fugiat. Nisi incididunt veniam excepteur dolor qui deserunt cupidatat cillum. Velit id labore nostrud veniam qui. Veniam culpa fugiat occaecat non nulla.</p><p>Deserunt enim ex labore laboris reprehenderit consequat dolor est officia labore ipsum. Enim officia ea enim in deserunt ipsum aliqua commodo. Consequat sit in quis Lorem eu adipisicing sint. Velit mollit nostrud dolore labore ea proident labore anim sint sint fugiat in quis.\n\nOfficia commodo in consectetur occaecat officia non. Culpa irure consequat mollit eu quis. Ipsum commodo nulla amet do tempor do sit dolor officia dolore irure consectetur proident fugiat.\n\nAute consectetur sint culpa aliqua nulla eu occaecat magna duis aute nisi in officia. Officia velit dolor est ad Lorem ipsum consectetur. Dolor id laboris nisi id culpa enim aliquip voluptate aliqua. Occaecat voluptate eu incididunt in aute ut do magna commodo. Dolore ipsum quis velit dolore adipisicing reprehenderit amet ea aliquip deserunt fugiat irure culpa officia. Esse magna officia quis amet aliqua officia mollit duis.</p><p>Exercitation elit anim est veniam ullamco. Occaecat magna voluptate laboris voluptate eiusmod. Ad esse consectetur aliquip velit.\n\nVeniam do mollit quis aute fugiat exercitation dolore adipisicing deserunt consectetur sit tempor. Cupidatat excepteur irure voluptate aliqua minim. Dolor dolor sint quis proident minim commodo ad velit proident non eu deserunt anim. Duis qui laboris culpa magna irure. Nulla excepteur non sit laboris non ullamco incididunt dolor cillum. Non ad ut ut amet cillum minim Lorem ut eu quis ipsum non. Fugiat proident pariatur anim laboris sint aliquip dolore mollit pariatur minim magna in qui.\n\nEa aute officia exercitation adipisicing fugiat mollit commodo consectetur nulla nostrud occaecat sit labore. Cillum irure nulla ullamco dolor eu labore culpa. Ut esse elit ullamco irure Lorem incididunt esse deserunt sunt est eu velit. Nostrud elit culpa laboris laboris ipsum ad incididunt. Elit anim magna minim excepteur id.\n\nDolor commodo magna ut aute sunt nisi eu ex consequat eu ea sint ea est. Aute ut non sint ea laboris eu officia aliquip laboris. Laborum culpa sunt elit culpa culpa sit nisi in do.\n\nCommodo commodo anim consectetur aliquip elit commodo aliquip sint incididunt. Velit esse fugiat aliqua magna aute qui laboris ea ut consectetur dolor. Ad enim ea et consectetur aute velit est sint cupidatat ad dolor pariatur eiusmod. Nostrud sit do qui mollit dolore nisi incididunt officia pariatur excepteur tempor. Cupidatat qui ea veniam labore cupidatat commodo pariatur velit commodo proident deserunt dolor. Officia aliqua ut culpa elit ea sunt ad esse sunt sunt voluptate nulla aliquip deserunt.</p><p>Esse id ut Lorem laboris. Cupidatat id ex proident consectetur Lorem do consectetur incididunt deserunt irure ut dolore in consequat. Commodo dolore adipisicing enim consectetur reprehenderit occaecat incididunt consectetur Lorem Lorem velit incididunt nostrud.\n\nVeniam adipisicing laborum magna cupidatat officia eiusmod culpa nostrud. Officia consequat incididunt nostrud irure aliqua Lorem minim cupidatat et sint magna deserunt sunt. Laboris ea non commodo anim. Aute commodo quis mollit culpa dolore qui deserunt minim anim. Do officia consequat eiusmod magna est reprehenderit. Veniam laboris ut dolor esse voluptate ipsum veniam. Cupidatat ad laboris nostrud irure esse.\n\nDolore sint proident ea sunt aute elit cupidatat Lorem magna. Mollit labore cillum adipisicing sunt aliqua. Eiusmod nostrud Lorem sit consectetur veniam sit amet id sint ipsum consequat eu. Voluptate laboris exercitation exercitation adipisicing incididunt quis esse commodo voluptate laborum.\n\nId minim nostrud Lorem sint nulla ut nisi cillum reprehenderit fugiat. Sit elit pariatur dolor culpa occaecat reprehenderit proident. Fugiat id in ad duis magna voluptate quis magna dolore.\n\nTempor cupidatat ullamco amet cillum commodo. Commodo consectetur qui Lorem cupidatat enim ea velit nostrud sit exercitation. Ullamco esse quis elit officia consequat dolore quis ex labore proident sint sint aute. Irure laborum ullamco ad consequat nisi non. Laborum id tempor elit labore adipisicing anim. Nulla exercitation ad eu anim.</p>",
    summary:
      "Consequat elit aliqua nulla nisi nisi anim proident. Lorem quis irure laborum mollit Lorem tempor pariatur aute. Veniam laborum consectetur id ad Lorem deserunt.",
    docNumber: "17 27 8(g)",
    docType: "sop",
    title: "id esse magna velit laborum sit"
  },
  {
    office: {
      title: "Office of aliquip pariatur",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sun Jan 08 2017 21:42:46 GMT+0000 (UTC)",
        effectiveDate: "Fri May 27 2011 08:38:22 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Tue Apr 11 2017 00:42:47 GMT+0000 (UTC)",
        effectiveDate: "Sat Dec 16 2006 10:37:36 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Thu Apr 27 2017 01:56:31 GMT+0000 (UTC)",
        effectiveDate: "Thu Apr 28 2011 01:01:13 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["CDC", "501(c)"],
    body:
      "<p>Qui cillum et fugiat proident magna labore laborum duis. Dolor sunt id labore labore laborum do velit dolor ullamco adipisicing. Est sunt velit nostrud ea ut cillum exercitation anim. Minim occaecat ad est ut. Nostrud reprehenderit laboris sit voluptate nostrud duis. Quis excepteur ad minim cillum id ipsum adipisicing incididunt irure nostrud ex eiusmod. Sit aliquip veniam exercitation adipisicing adipisicing sint velit consectetur et officia enim.</p><p>Ad mollit officia dolor consectetur exercitation aute ex fugiat. Enim anim excepteur et pariatur nisi enim ad. Ullamco quis labore aliquip deserunt aute ea.\n\nAdipisicing magna quis enim sunt ex magna aliqua magna eiusmod elit qui duis. Officia quis fugiat ullamco sunt velit consequat. Quis ullamco do dolor magna incididunt ad ipsum enim voluptate esse pariatur commodo.\n\nSint eiusmod eu ipsum enim eiusmod amet aliqua duis duis aliqua cupidatat cillum labore. Qui sint cillum ad reprehenderit laborum commodo quis tempor culpa dolore pariatur dolor eiusmod laborum. Consequat occaecat reprehenderit aliquip commodo in Lorem incididunt consequat proident deserunt eu eu velit ad. Occaecat et esse officia pariatur excepteur velit ad exercitation labore est nostrud minim aliquip.</p><p>Eu dolore veniam Lorem ad id commodo qui qui exercitation do. In consequat elit ad exercitation esse fugiat voluptate eiusmod enim commodo. Voluptate id culpa quis esse est non ipsum ut reprehenderit ut laborum deserunt quis adipisicing. Cupidatat excepteur sunt sunt fugiat laborum exercitation duis sunt. Nulla anim pariatur deserunt elit minim Lorem reprehenderit aliquip eiusmod cillum et excepteur cupidatat fugiat. Sit aliquip Lorem veniam laborum. Laborum eiusmod et minim labore esse ea exercitation deserunt culpa excepteur labore incididunt laborum aliqua.\n\nSint nulla proident amet nisi proident mollit sunt ad labore. Veniam mollit adipisicing incididunt aliquip. Occaecat magna enim ex fugiat tempor cillum aute do occaecat consequat veniam.\n\nEnim sunt deserunt amet officia aliquip cillum pariatur officia fugiat exercitation labore. Quis pariatur minim eiusmod cupidatat reprehenderit exercitation id ex duis dolor pariatur laborum eiusmod. Ut aliquip est reprehenderit aute id minim ipsum amet.\n\nVoluptate eiusmod incididunt eu reprehenderit occaecat incididunt sit aliquip exercitation incididunt velit. Cupidatat exercitation et nostrud irure eiusmod. Elit amet et tempor excepteur fugiat ad sit. Aute velit amet mollit nostrud nulla incididunt officia proident est excepteur deserunt eu. Voluptate magna dolore ullamco sit enim. Laborum cillum magna ex excepteur anim. Ea velit incididunt pariatur ad et laborum consectetur sint velit ex id culpa.\n\nExercitation ea magna ut reprehenderit ex officia. Fugiat ut est mollit aliquip cupidatat consequat sint esse est sint. Lorem laboris duis ad sint id. Aliquip enim consectetur proident veniam id et. Laboris voluptate sit Lorem veniam fugiat. Aute aliqua esse eiusmod pariatur exercitation ut reprehenderit.</p><p>Voluptate ex consequat fugiat est. Aute fugiat irure tempor aliquip mollit sint fugiat amet mollit ipsum elit qui enim. Proident excepteur laboris Lorem id nisi ut laboris fugiat veniam incididunt velit in. Ut voluptate et esse minim ad voluptate consequat nulla proident quis anim. Esse ea Lorem nostrud occaecat dolore dolor. Cillum magna consectetur nostrud elit irure in consectetur eiusmod sit. Eu sit eiusmod occaecat aute ea elit aute.\n\nSit proident consequat nostrud quis velit culpa eiusmod pariatur incididunt ea consequat. Tempor nostrud sunt fugiat sit laborum nostrud velit duis magna dolore dolore irure elit incididunt. Aliquip laborum voluptate elit adipisicing voluptate aliqua dolor deserunt ad ipsum. Ad duis nisi minim mollit in ut nulla aute commodo reprehenderit cillum Lorem et voluptate. Ad ea velit laborum cillum id consectetur ea excepteur mollit id ipsum. Aliquip enim labore esse pariatur est laborum aliquip do. Anim velit voluptate nulla tempor id culpa elit amet.\n\nEx cupidatat proident non veniam cillum ipsum occaecat ad. Cillum tempor labore ullamco dolore commodo aliquip consectetur laborum commodo aute elit adipisicing. Magna esse proident ex officia dolor mollit ea officia do nisi veniam eu incididunt quis. Consectetur laborum fugiat ex magna sint labore mollit aliqua.\n\nExcepteur consequat reprehenderit velit incididunt do laborum amet mollit culpa consequat. Officia do laborum ut duis occaecat adipisicing irure nisi nostrud aliqua. Exercitation consequat deserunt magna nisi. Adipisicing incididunt ea consectetur ad velit consectetur. Lorem minim irure aute cupidatat in non culpa.\n\nQuis mollit sint ea ut ea in ad et eiusmod. Culpa non mollit est ipsum ex laborum esse eiusmod nostrud duis. Mollit anim fugiat duis irure consequat est pariatur excepteur fugiat exercitation. Deserunt ea deserunt et eu nostrud sit dolore tempor.</p>",
    summary:
      "Elit officia ad culpa nulla elit occaecat deserunt enim pariatur Lorem cupidatat excepteur. Occaecat nostrud tempor quis exercitation incididunt. Nisi elit sit laborum proident ullamco anim cupidatat laboris.",
    docNumber: "3 37 2(g)",
    docType: "sop",
    title: "do ad Lorem duis sunt elit"
  },
  {
    office: {
      title: "Office of tempor id",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Mon May 15 2017 18:46:32 GMT+0000 (UTC)",
        effectiveDate: "Mon Feb 09 2015 18:06:53 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Tue Feb 21 2017 11:46:15 GMT+0000 (UTC)",
        effectiveDate: "Sat May 23 2009 22:03:31 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Wed Mar 29 2017 00:37:04 GMT+0000 (UTC)",
        effectiveDate: "Sun Apr 10 2011 18:19:26 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC"],
    body:
      "<p>Quis voluptate incididunt irure mollit fugiat ea deserunt esse voluptate esse sit voluptate adipisicing. Velit exercitation irure pariatur quis id Lorem dolore duis. Amet anim ex sint nisi proident nostrud duis id commodo sunt nulla aute veniam. Lorem veniam sit officia eu eiusmod esse fugiat laborum veniam qui consectetur aute consequat do. In enim excepteur veniam qui.</p><p>Veniam cupidatat sint ex commodo aute amet sit enim tempor adipisicing. Nulla sit ex anim excepteur labore sint magna aliqua tempor irure. Velit aliqua nostrud occaecat amet amet sint irure. Ullamco Lorem est nulla exercitation elit magna magna ullamco excepteur mollit ipsum. Id amet quis occaecat sint ex sunt exercitation ea voluptate commodo qui qui mollit.\n\nEx sit ex ea nulla voluptate fugiat nulla nulla. Sit sit eiusmod dolor qui eiusmod duis ea ut magna ipsum nisi. Minim sit tempor laboris nostrud enim veniam labore ullamco est. Dolor proident ullamco consectetur occaecat esse quis. Deserunt laborum sit ex adipisicing cillum voluptate tempor voluptate quis dolore id qui nisi.\n\nDolore ex ut dolor dolor in Lorem pariatur Lorem. Reprehenderit non cillum ea ipsum nulla nostrud ipsum nisi. Id ut sunt exercitation occaecat mollit laboris.</p><p>Nisi aliqua proident et ea consectetur adipisicing nulla amet consectetur excepteur in culpa. Aliquip dolor magna in magna reprehenderit aliquip adipisicing duis deserunt laboris qui eu ipsum. Elit proident voluptate ut consequat incididunt eiusmod. Laborum non officia incididunt ullamco pariatur cupidatat.\n\nVoluptate do commodo eiusmod id sunt laboris labore ipsum duis et consectetur in. Sint amet occaecat nulla ex exercitation deserunt officia et incididunt quis. Sunt eiusmod irure labore do officia nisi aliqua in deserunt occaecat eiusmod.\n\nNisi reprehenderit incididunt ut esse nisi enim adipisicing ipsum qui deserunt exercitation officia elit. Aliqua do quis labore mollit exercitation ipsum commodo. Enim minim consectetur et ut culpa.\n\nNulla culpa in irure sint labore culpa aliqua adipisicing sit. Amet officia nostrud laboris excepteur magna voluptate elit dolore esse laborum aliquip sint. Deserunt minim esse ipsum aute proident ad sit qui occaecat elit.\n\nDolor cupidatat et id est enim. Excepteur sint voluptate est amet. Non ut ut eiusmod do reprehenderit. Tempor reprehenderit reprehenderit ex deserunt sit quis irure nulla. Id cillum in eiusmod nostrud sit. Cillum deserunt minim Lorem nisi.</p><p>Elit aute exercitation exercitation adipisicing dolore mollit sunt aliquip eu. Quis esse aute ea consequat dolor laborum minim aute dolor veniam nulla eiusmod qui. Sint nisi enim officia sint mollit ut magna ex cillum cupidatat amet. Enim consequat officia esse eu proident occaecat quis laborum nostrud. Non sit dolore ea voluptate eu proident irure officia ipsum aliqua. Consequat commodo irure ad Lorem do. Laboris occaecat anim in qui proident cillum irure Lorem.\n\nDolore ut et adipisicing eu amet fugiat. Minim do laboris est nisi Lorem Lorem Lorem minim aliqua aliquip adipisicing. Aliqua aliqua aliquip sunt sint magna ut veniam dolor excepteur in consectetur ut.\n\nVeniam et occaecat cupidatat amet. Consectetur tempor elit sint sint nulla nostrud proident eu commodo ullamco sit et. Laborum veniam aliquip id magna cillum non occaecat non adipisicing dolore id laboris aliqua aute.\n\nTempor non fugiat esse pariatur irure tempor minim consequat laboris cupidatat cillum amet deserunt nostrud. Duis duis minim veniam ut et. Aliquip ea amet est ea laboris anim qui officia non ipsum enim duis excepteur. Reprehenderit fugiat aliquip consequat anim officia. Velit velit enim excepteur laborum duis nostrud laborum. Qui anim ut nisi dolore. In et anim ullamco cupidatat officia exercitation.\n\nVeniam nulla ut dolor voluptate nostrud officia pariatur incididunt aliqua id tempor veniam ullamco ea. Adipisicing aliquip duis ea est pariatur esse sit labore dolor amet nisi velit in mollit. Qui commodo dolore ex sit ipsum tempor et nisi excepteur minim dolore quis. Pariatur nulla Lorem anim ipsum velit consectetur nisi exercitation aute consectetur commodo anim. Laboris consectetur nulla minim consectetur. Minim labore dolor nisi anim eiusmod pariatur sint. Aliquip cupidatat amet commodo qui.</p>",
    summary:
      "Aliqua proident ut anim ut consectetur id pariatur. Esse pariatur eu aute excepteur exercitation in nostrud culpa elit. Consectetur labore tempor dolor veniam consectetur adipisicing non consectetur sit consectetur eiusmod. Sunt eu aute labore sunt voluptate est cillum enim. Velit duis in proident nulla tempor exercitation veniam ad deserunt sit proident nulla. Exercitation dolore quis sint incididunt minim sit sint dolor.",
    docNumber: "11 15 7(g)",
    docType: "form",
    title: "non nostrud incididunt dolore officia consectetur"
  },
  {
    office: {
      title: "Office of ex amet",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sun Jan 29 2017 06:05:46 GMT+0000 (UTC)",
        effectiveDate: "Tue Mar 13 2001 13:59:21 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Thu Apr 27 2017 06:17:10 GMT+0000 (UTC)",
        effectiveDate: "Tue Mar 15 2005 16:18:17 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Mon Mar 27 2017 18:22:06 GMT+0000 (UTC)",
        effectiveDate: "Wed Jan 20 2010 02:10:15 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["CDC"],
    body:
      "<p>Adipisicing laborum reprehenderit ex mollit cupidatat qui velit commodo culpa laborum id. Nulla anim mollit laboris laboris magna Lorem ipsum exercitation do elit aliquip pariatur aute. Culpa elit esse minim quis reprehenderit dolor culpa occaecat ea qui. Esse reprehenderit commodo consectetur proident proident eiusmod minim ex in velit excepteur ex. Sit culpa cillum dolor sint veniam enim laboris consequat eiusmod ea. Mollit ad ad dolor ullamco. Minim labore aute pariatur nostrud ut ad dolore officia irure.</p><p>Exercitation proident elit ad dolore eiusmod ipsum elit ipsum mollit. Voluptate anim mollit proident laboris anim dolore incididunt in proident. Incididunt ut laborum ex anim. Reprehenderit cillum non qui et quis id adipisicing amet minim amet.\n\nEnim do eiusmod Lorem est dolor amet elit veniam incididunt laboris reprehenderit anim consequat aute. Qui veniam nulla ullamco anim fugiat do excepteur consectetur. Eu aute laboris consectetur amet. Sint et tempor sunt duis consequat ad. Officia eu occaecat consequat voluptate aliquip. Eiusmod consequat pariatur aute laborum irure amet voluptate. Proident incididunt qui aliqua enim ex est.\n\nConsectetur proident esse et id minim officia do non eiusmod ea. Non duis eu eu laborum consequat culpa fugiat commodo sint irure ut. Esse non fugiat deserunt eiusmod eu. Laborum laborum cupidatat reprehenderit non. Enim ullamco duis voluptate sit ad enim consectetur ut sint mollit aliqua. Aliquip aliquip ex consequat voluptate occaecat et excepteur nisi.</p><p>Laborum labore exercitation et nulla esse ea consectetur ad pariatur exercitation nulla. Eu ipsum anim id commodo voluptate dolor. Id excepteur sit occaecat eiusmod eiusmod nostrud do laboris. Laborum exercitation dolor incididunt consectetur sit.\n\nNulla duis elit dolor dolor sit tempor. Consectetur do fugiat magna enim ea duis reprehenderit mollit minim aute. Nostrud sit culpa elit dolor sit sunt proident non Lorem culpa magna et deserunt pariatur. Nisi duis pariatur quis ipsum voluptate Lorem. Tempor sunt voluptate eiusmod duis.\n\nAliquip cillum Lorem quis in consectetur. Excepteur ullamco excepteur ipsum dolore esse ullamco aliqua sit. Consequat laboris mollit eu duis in qui minim veniam cupidatat laboris commodo.\n\nEa tempor eiusmod dolor nostrud mollit minim aute labore nostrud ad adipisicing ipsum sunt esse. Culpa qui velit irure excepteur. Amet ut non eiusmod duis quis adipisicing amet culpa reprehenderit in exercitation. Ad eiusmod excepteur fugiat excepteur et ad laborum laborum voluptate excepteur.\n\nReprehenderit adipisicing pariatur do ullamco proident cupidatat pariatur consequat ad tempor id. Ullamco id elit ullamco eiusmod sit ipsum. Ad ullamco quis quis qui et enim commodo eiusmod irure. Eiusmod dolore consectetur aliqua eiusmod cupidatat proident reprehenderit. Occaecat nostrud dolor Lorem est commodo ex do reprehenderit amet minim velit dolor. Est ullamco culpa velit adipisicing irure magna adipisicing aliqua quis sit proident.</p><p>Aute ipsum dolore nostrud nostrud minim labore sit officia. Ad id in quis dolore et enim ut labore ex laborum sint aute. Pariatur enim cillum qui nulla sit consequat nulla et aliquip adipisicing quis consectetur et. Cupidatat consequat deserunt dolor ullamco eiusmod dolore cillum ipsum nisi. Officia sint nostrud sunt minim nisi. Fugiat quis minim pariatur occaecat non ex Lorem cupidatat amet in. Nisi dolore culpa ut minim consequat minim ullamco id sunt aliqua aliquip irure ullamco voluptate.\n\nIpsum cillum officia mollit labore qui exercitation non occaecat in incididunt reprehenderit. Duis deserunt do anim et est excepteur ipsum ad. Duis pariatur fugiat in sunt eiusmod eu. Consectetur eu id exercitation velit dolor do ad nostrud irure nulla labore velit amet voluptate.\n\nNulla in reprehenderit eiusmod excepteur Lorem. Non incididunt magna proident qui elit ad. Pariatur duis ullamco ad amet ex est est aliquip ex occaecat sit veniam.\n\nEsse occaecat dolor velit consectetur magna minim. Ad tempor aute eiusmod ea et irure nostrud nisi ex do duis dolore deserunt enim. Laboris nostrud nulla tempor esse dolore veniam ea. Consequat esse voluptate aliquip qui consequat. Mollit ipsum anim amet voluptate officia anim officia officia nisi fugiat. Fugiat quis proident duis do pariatur anim ea sunt sint laboris ea duis ex.\n\nEt ex laborum sint laboris minim. Lorem est minim irure labore velit esse et non cillum non excepteur dolor. Consequat pariatur ea nisi ut ad est dolor. Laboris fugiat consectetur laboris occaecat excepteur occaecat commodo eiusmod nisi. Et nostrud id mollit proident ad ipsum nisi culpa aute enim deserunt adipisicing. Incididunt proident exercitation anim ea ex mollit.</p>",
    summary:
      "Minim commodo occaecat irure sint aute magna officia sint non commodo ex adipisicing. Enim fugiat deserunt laborum officia duis. Amet non reprehenderit id in amet est amet in incididunt ut.",
    docNumber: "13 6 2(g)",
    docType: "sop",
    title: "id est Lorem ullamco voluptate ullamco"
  },
  {
    office: {
      title: "Office of est fugiat",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sun Mar 19 2017 16:04:09 GMT+0000 (UTC)",
        effectiveDate: "Fri May 11 2007 13:03:18 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sun Feb 05 2017 21:21:46 GMT+0000 (UTC)",
        effectiveDate: "Sun Aug 12 2012 06:52:03 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Wed Apr 05 2017 00:33:33 GMT+0000 (UTC)",
        effectiveDate: "Fri Jul 25 2014 20:50:45 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC"],
    body:
      "<p>Amet elit sit duis ut officia proident do fugiat exercitation mollit labore duis. Sunt consequat reprehenderit sint elit proident dolore mollit id aliqua non officia exercitation ut. Ipsum quis dolore amet officia eu irure occaecat veniam culpa exercitation esse laborum anim. Sit esse amet qui nostrud nostrud reprehenderit adipisicing excepteur pariatur officia.</p><p>Aliqua veniam eu proident mollit aute proident laborum labore irure. Exercitation enim et eiusmod est sunt ad fugiat. Ipsum nisi magna occaecat exercitation cupidatat. Aliqua et laboris irure esse reprehenderit excepteur veniam Lorem ad occaecat.\n\nNostrud nisi mollit aliqua mollit sit occaecat mollit sunt. Sint ea cupidatat aliquip sint nisi adipisicing ipsum minim proident aliquip. Qui eu dolor dolore mollit velit anim laboris aliquip sunt minim laboris. Ex aliqua sunt mollit sunt minim nisi ullamco reprehenderit voluptate consectetur nostrud ipsum qui consequat.\n\nIrure irure ad consectetur ullamco reprehenderit. Sit velit in eiusmod ipsum id commodo ullamco cupidatat magna voluptate consequat culpa do elit. Culpa nostrud est ea labore. Ad ex mollit est duis laboris do irure occaecat sint Lorem voluptate.</p><p>Reprehenderit non mollit exercitation quis sunt occaecat quis Lorem culpa. Consequat incididunt cupidatat nisi voluptate cupidatat pariatur labore fugiat sunt ut incididunt incididunt. Aute laborum laborum nisi eiusmod. Quis aute quis Lorem voluptate id cupidatat.\n\nAdipisicing consectetur cillum pariatur sunt mollit minim enim aliqua laborum esse dolor in. Ut laboris enim cupidatat est. Dolor ea labore ut consectetur labore consequat labore sunt proident amet sint dolor excepteur ad. Pariatur reprehenderit cupidatat fugiat eu enim.\n\nLaboris aliqua anim ea Lorem elit. Fugiat sunt quis ad minim fugiat. In deserunt commodo officia et occaecat reprehenderit.\n\nEa ea laborum laboris occaecat duis irure cillum velit incididunt incididunt dolore est mollit. Qui velit id anim ad officia eiusmod et enim. Culpa deserunt fugiat amet elit nostrud nulla aliquip. Proident sint ut sunt consequat irure ipsum elit ullamco qui non do dolor eu nostrud. Anim aute excepteur ipsum Lorem excepteur. Nisi incididunt ullamco commodo esse est ullamco duis sint dolor consectetur aliquip laboris velit. Non laborum qui non in excepteur cillum et dolor nulla reprehenderit pariatur adipisicing.\n\nAd reprehenderit eiusmod non do nisi consequat adipisicing exercitation exercitation duis. Ullamco consequat officia in tempor. Aliquip laboris aliquip cillum deserunt voluptate.</p><p>Nulla laborum consectetur anim laborum anim ex qui nulla. Commodo exercitation ipsum ullamco sint reprehenderit in tempor. Ex dolore in sint aliquip Lorem nulla culpa qui tempor.\n\nUllamco nostrud sit sunt aliqua aliquip velit excepteur. Occaecat deserunt magna elit deserunt reprehenderit elit mollit cillum esse consectetur. Amet excepteur aliquip occaecat non Lorem sit proident laboris excepteur dolor eu nostrud. Non laboris sint anim anim Lorem amet elit ex ad sint anim. Quis exercitation deserunt commodo consequat est culpa duis qui est.\n\nPariatur ipsum enim fugiat minim ad est elit nulla laboris ea dolore ea culpa sunt. Eiusmod veniam pariatur in dolor minim. Eiusmod laborum magna dolor in ut eu excepteur minim elit in.\n\nIrure sit consequat consectetur eu cillum dolore. Dolore sunt laboris eu anim reprehenderit nostrud eu minim fugiat qui enim. Et commodo est nostrud enim. Quis enim ad ea eu non.\n\nFugiat sint amet voluptate nostrud enim duis. Quis sunt officia est proident fugiat esse. Excepteur ut mollit anim esse cupidatat aute. Commodo Lorem aliquip ipsum sit non consequat ut ea amet. Irure dolore laborum est labore elit incididunt duis duis sit tempor id Lorem magna.</p>",
    summary:
      "Sit occaecat sit ad esse sunt cupidatat Lorem eiusmod fugiat. Occaecat nisi fugiat id est et magna voluptate aute tempor non esse ea irure. Irure excepteur ad Lorem fugiat sint et cillum fugiat elit. Id est culpa deserunt id amet sunt ullamco pariatur proident ex voluptate culpa. Magna non excepteur eu sint aute id Lorem culpa excepteur ex Lorem magna amet irure. Exercitation ea dolor pariatur dolore exercitation cillum pariatur et. Elit veniam est proident et enim est.",
    docNumber: "36 10 2(g)",
    docType: "sop",
    title: "cillum voluptate anim qui laboris sit"
  },
  {
    office: {
      title: "Office of esse magna",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Mon May 29 2017 01:53:27 GMT+0000 (UTC)",
        effectiveDate: "Wed Mar 07 2012 23:51:11 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sun Feb 26 2017 00:53:45 GMT+0000 (UTC)",
        effectiveDate: "Thu Oct 19 2006 23:52:32 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Wed Jun 14 2017 05:46:13 GMT+0000 (UTC)",
        effectiveDate: "Sat Jan 31 2004 15:39:57 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["CDC"],
    body:
      "<p>Et est reprehenderit velit nulla elit magna. Commodo ullamco dolore quis incididunt officia Lorem elit ullamco duis aliqua nisi non et ullamco. Eiusmod exercitation aute magna excepteur. Reprehenderit Lorem eiusmod occaecat nostrud ad eiusmod.</p><p>Nisi pariatur fugiat anim ex cupidatat aliqua ut id do. Eiusmod esse proident laboris Lorem culpa. Labore amet ipsum id laborum dolor labore velit adipisicing exercitation aliquip sit. Dolor mollit officia nisi magna occaecat ullamco tempor exercitation. Aliquip ex reprehenderit mollit nostrud ad dolor et. Irure enim excepteur mollit amet voluptate qui velit veniam occaecat aliqua sint exercitation qui. Eiusmod sunt aliquip ea dolor sint.\n\nProident ullamco occaecat veniam laborum Lorem eu aute sunt. Irure adipisicing nisi magna adipisicing velit et reprehenderit irure aliqua. Veniam in exercitation irure ea amet eu ad cillum eiusmod sit ad nulla commodo. Aliqua incididunt magna voluptate laborum commodo laborum irure ipsum cillum anim.\n\nId amet dolore in consequat. Est proident officia aliqua ullamco adipisicing tempor quis laboris culpa. Enim est adipisicing qui sunt dolor sint nulla ut exercitation est est consequat.</p><p>Do consectetur consectetur qui sunt pariatur id. Fugiat velit nostrud deserunt pariatur cupidatat duis commodo do pariatur adipisicing ex sit ea. Est sint eu Lorem id sint laboris sit ut. Consequat voluptate incididunt officia esse eiusmod velit sit cillum nisi. Ut id enim est irure ut dolor aliquip culpa sunt esse non.\n\nQuis et ad enim Lorem ad cillum non consectetur consectetur Lorem duis cillum. Quis ullamco incididunt irure aliqua dolor anim tempor cillum labore sit tempor. Eiusmod duis ipsum fugiat aliqua excepteur excepteur consectetur ad consequat laboris adipisicing laborum. Cupidatat dolore esse velit tempor cillum est nisi enim minim. Sunt mollit nulla anim ad proident. Ad laboris deserunt cupidatat deserunt eiusmod non velit minim anim. Reprehenderit eu amet culpa non ea laboris esse incididunt dolor amet sunt cillum aliqua.\n\nDo sint veniam nostrud eu aliqua duis aute ut aliquip minim veniam. Exercitation laboris non voluptate pariatur ut nisi esse anim exercitation labore ad occaecat adipisicing. Ullamco nisi adipisicing laborum cillum incididunt cillum adipisicing consectetur magna velit culpa id elit ullamco.\n\nNon non culpa ipsum sint id culpa ullamco occaecat laborum do. Lorem culpa et excepteur id. Sint cupidatat proident commodo occaecat enim aute ea quis anim voluptate nulla officia esse. Magna exercitation Lorem ad qui officia occaecat ad incididunt consectetur. Non eiusmod aliqua id dolore nisi ut ipsum nostrud qui sint nostrud ipsum deserunt. Ea pariatur qui aute do ipsum cillum culpa cupidatat culpa.\n\nIncididunt id laboris aute proident pariatur quis culpa in qui Lorem veniam excepteur incididunt exercitation. Eu laborum tempor elit exercitation duis culpa velit. Eu quis pariatur nisi Lorem consequat.</p><p>Exercitation aliqua sunt mollit nulla proident. Nulla fugiat in elit mollit voluptate anim duis occaecat ipsum reprehenderit officia proident tempor sunt. Culpa eu do velit ullamco sint qui enim id aute. Ex occaecat dolore Lorem incididunt culpa.\n\nOccaecat veniam deserunt magna in anim eu ut velit sit. Cillum minim reprehenderit esse ex. Veniam aliqua sit in exercitation ea pariatur. Ad velit proident dolor reprehenderit reprehenderit. Sit amet occaecat consectetur incididunt elit aute non adipisicing est labore. Ipsum adipisicing esse aliqua irure laborum et sit. Nulla ex do veniam dolor irure sunt occaecat exercitation culpa mollit elit.\n\nEiusmod nulla velit amet sunt incididunt adipisicing qui nisi pariatur. Magna Lorem esse do duis proident cupidatat duis nulla dolore. Veniam deserunt aliqua voluptate aute laboris velit laborum cupidatat dolore minim ea adipisicing ea.\n\nAd cillum incididunt ad id ullamco deserunt. Do sit consequat qui id laborum aliqua aute tempor et reprehenderit. Id anim commodo aliquip adipisicing mollit commodo et. Consequat aliqua labore eu enim in ipsum et mollit deserunt nulla irure eiusmod consectetur deserunt. Proident magna incididunt velit enim officia nulla magna enim excepteur laborum sint. Occaecat qui mollit id aute ad id non eu adipisicing nostrud consectetur magna amet qui. Id eiusmod cupidatat enim duis culpa tempor minim dolor deserunt fugiat ad.\n\nLaborum adipisicing non reprehenderit sint commodo nulla elit aliquip laboris nisi. Laboris anim consectetur nulla fugiat nulla. Consectetur ex sint commodo consequat anim in laborum ut in.</p>",
    summary:
      "Non est aliqua cillum adipisicing ut consequat excepteur sint duis. Nisi exercitation laborum et id consectetur nisi cupidatat commodo. Elit commodo proident qui dolor irure est consectetur. Culpa nisi consectetur eu eiusmod consectetur aute id commodo ipsum non velit anim. Eu proident minim irure sunt non excepteur tempor qui.",
    docNumber: "18 29 7(g)",
    docType: "form",
    title: "nisi anim labore enim laborum magna"
  },
  {
    office: {
      title: "Office of commodo sint",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Wed Feb 22 2017 23:56:09 GMT+0000 (UTC)",
        effectiveDate: "Sun Mar 25 2001 15:33:44 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Fri Mar 31 2017 01:07:34 GMT+0000 (UTC)",
        effectiveDate: "Fri Jul 31 2015 07:51:43 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Thu Jun 01 2017 23:06:49 GMT+0000 (UTC)",
        effectiveDate: "Wed Jan 04 2012 09:54:38 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["501(c)"],
    body:
      "<p>Voluptate ullamco duis quis aliquip tempor laboris cupidatat. Veniam quis dolor non consequat sunt occaecat nostrud adipisicing eu quis cillum nostrud. Voluptate sit Lorem eu minim aliquip. Adipisicing consequat officia aliqua laborum est elit aliquip ut do quis excepteur aute eu. Nulla do nisi ad in incididunt duis. Incididunt consequat laborum id sint anim. Ullamco est aliqua velit reprehenderit consequat laborum aliquip non nisi dolore mollit esse adipisicing.</p><p>Pariatur nisi culpa nostrud pariatur exercitation consectetur excepteur Lorem. Sunt nostrud nulla sit esse adipisicing aliqua ut ut. Culpa non aliquip in sint nostrud nostrud. Aliqua enim consectetur ea eu pariatur mollit. Nulla dolor in pariatur enim. Nulla aliqua elit commodo reprehenderit qui et mollit non anim. Laborum quis ex fugiat aliquip consectetur.\n\nAnim reprehenderit laborum culpa qui. Anim id tempor ut anim. Eu adipisicing occaecat dolore exercitation non nostrud in tempor duis fugiat aliqua.\n\nVeniam anim nulla proident est sunt labore Lorem ea deserunt proident nisi officia. Elit laborum nostrud officia excepteur eiusmod magna sunt irure incididunt sint. Voluptate velit nostrud mollit proident commodo ipsum.</p><p>Fugiat adipisicing ea aliquip commodo ullamco adipisicing dolore consequat. Aliqua sint voluptate aliqua adipisicing ad. Aute culpa consectetur sint commodo ad quis esse enim ut. Ut voluptate cillum qui velit cupidatat adipisicing sint ad tempor aliquip Lorem dolor consectetur. Ex voluptate proident ullamco esse ullamco. Anim enim labore dolor eu ullamco deserunt velit.\n\nCommodo excepteur occaecat Lorem consequat. Nulla culpa deserunt mollit ex enim. Ea esse quis enim ut velit. Magna aute esse veniam velit deserunt ut proident dolore esse nulla.\n\nDeserunt qui in ad minim non nulla sit eu cillum irure ipsum aliquip. Duis veniam aliquip duis sit consectetur duis cillum. Aliqua tempor mollit aute magna nostrud quis labore consectetur. In eu fugiat magna reprehenderit cillum.\n\nVoluptate consectetur quis eiusmod ad non occaecat commodo do laborum aliqua aliquip ipsum sit officia. Consectetur elit cupidatat reprehenderit elit dolor eu ipsum. Officia duis non dolore qui adipisicing consequat sit pariatur minim cupidatat officia dolor et. Proident sunt qui ullamco aliquip tempor et consequat aliquip. Velit ipsum anim culpa ullamco. Aliquip ut id enim qui enim ad. Non anim amet pariatur aute ad voluptate est minim eiusmod.\n\nConsequat adipisicing laborum ea fugiat cillum veniam ut. Aliqua occaecat sint excepteur anim. Aliquip enim anim culpa amet. Aute sit officia ut fugiat ullamco eu. Incididunt cillum est Lorem sunt consectetur ipsum cupidatat velit et eiusmod commodo.</p><p>Tempor tempor proident non mollit labore. Duis duis consequat consectetur dolore cupidatat cupidatat laborum cillum deserunt aliqua enim reprehenderit aliquip. Tempor enim sint elit commodo voluptate elit non eu exercitation quis non. Fugiat non reprehenderit incididunt ex cillum in laborum dolore pariatur occaecat nulla incididunt minim id. Ad enim irure voluptate pariatur ipsum do incididunt ut adipisicing ipsum.\n\nCupidatat occaecat sint incididunt nisi. Cupidatat pariatur non aliquip deserunt pariatur labore ipsum non exercitation occaecat. Amet ut irure mollit reprehenderit ipsum cillum. Non aute pariatur incididunt mollit magna officia enim. Fugiat excepteur adipisicing ex dolor consectetur proident aliquip aliqua aute. Aute sunt consequat velit voluptate nisi consectetur laborum nostrud non. Nostrud pariatur cupidatat ea magna minim eu eu incididunt cillum est.\n\nAliqua exercitation veniam officia aliqua. Consectetur consectetur do officia deserunt occaecat. Dolor eu elit velit nulla aute esse duis deserunt.\n\nEa culpa eiusmod ut do duis pariatur adipisicing ipsum nostrud anim. Duis aliquip eiusmod pariatur amet. Aliqua elit enim eiusmod esse reprehenderit Lorem duis do et.\n\nAliqua quis sint nulla eu. Sit eiusmod velit aliquip consequat qui officia occaecat officia sint. Excepteur magna adipisicing non cupidatat pariatur ex anim magna enim et amet ea aliqua adipisicing.</p>",
    summary:
      "Lorem consectetur pariatur aute deserunt cillum ipsum ea ipsum commodo aute sunt fugiat reprehenderit. Non mollit laboris anim voluptate dolore deserunt minim laborum aliquip labore. Laborum magna irure velit do sunt exercitation est elit deserunt nostrud. Incididunt velit tempor quis dolore elit velit eiusmod deserunt proident labore reprehenderit adipisicing. Excepteur labore consectetur pariatur elit cillum nisi tempor anim eiusmod.",
    docNumber: "50 14 8(g)",
    docType: "form",
    title: "exercitation id pariatur consectetur minim ullamco"
  },
  {
    office: {
      title: "Office of cupidatat officia",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Fri May 26 2017 05:14:53 GMT+0000 (UTC)",
        effectiveDate: "Tue Sep 25 2012 08:57:45 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sun May 21 2017 21:59:49 GMT+0000 (UTC)",
        effectiveDate: "Thu Apr 24 2008 23:48:26 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sun May 14 2017 21:44:04 GMT+0000 (UTC)",
        effectiveDate: "Sat Dec 31 2011 11:34:18 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["8(a)"],
    body:
      "<p>Deserunt eiusmod non esse reprehenderit. Lorem reprehenderit proident tempor sit nostrud ad veniam. Laboris labore ullamco irure est culpa nisi ut Lorem. Mollit sunt sit ullamco consequat nostrud cillum aute nisi eu velit enim tempor aliqua aliqua. Consequat tempor est tempor sint eiusmod.</p><p>Voluptate consequat ad non tempor exercitation sint sint. Magna sunt occaecat voluptate mollit id quis tempor nulla excepteur. Minim aute duis irure ullamco ad consequat velit sunt. Fugiat ullamco fugiat et commodo eiusmod veniam occaecat non duis. Sunt qui id est ut aliqua dolor consequat veniam dolor in pariatur.\n\nDolor laboris nostrud mollit exercitation. Occaecat nulla do amet veniam aliqua tempor consequat nisi. Adipisicing ex nostrud sit sunt.\n\nEnim id adipisicing incididunt ut anim occaecat. Lorem reprehenderit Lorem ullamco cillum nulla nostrud aliquip deserunt. Fugiat non aliquip ad cupidatat elit consectetur. Voluptate eiusmod velit minim amet laborum sunt pariatur deserunt et aute. Excepteur elit commodo incididunt dolor eiusmod aliqua in qui. Veniam enim aute fugiat laborum non nisi sunt ipsum ullamco mollit.</p><p>Qui non ad amet commodo in aute laborum est quis aliqua velit tempor. In sint anim aliquip aute commodo aute nulla id amet consectetur fugiat cillum. Ad ipsum incididunt laborum dolore mollit sit adipisicing ipsum. Ullamco ut id consectetur amet sit enim consequat laboris nostrud ad. Deserunt nisi proident elit aliqua ut sint aliquip est velit Lorem qui ipsum.\n\nExcepteur cillum quis exercitation nisi ullamco nisi sit quis sunt velit consectetur ullamco adipisicing. Dolor ex velit nisi exercitation eiusmod adipisicing nulla est velit in elit id consequat do. Magna proident duis esse ipsum nulla mollit occaecat deserunt excepteur ipsum culpa occaecat qui ex. Sint enim officia velit dolore pariatur qui esse magna Lorem ipsum ullamco ipsum minim. Ullamco est velit enim mollit sit proident sint enim eiusmod ullamco dolore. Dolor ad nostrud eiusmod ad culpa sint enim sunt incididunt mollit et officia qui magna. Laboris ea exercitation elit quis.\n\nConsectetur anim laborum excepteur fugiat anim ipsum voluptate. Tempor sint irure ut tempor laborum minim amet commodo. Excepteur et ea laborum nisi mollit. Nulla et labore officia exercitation ad laboris dolor sit officia laborum nostrud laboris nulla.\n\nDeserunt adipisicing pariatur dolor voluptate quis tempor laborum Lorem voluptate id aliqua mollit. Irure enim dolore magna elit eiusmod Lorem culpa eu consequat cillum. Voluptate exercitation in magna pariatur esse laborum dolor est quis sunt dolore ex sint non.\n\nLorem amet sit amet est eiusmod consectetur Lorem cillum tempor et occaecat consequat esse. Eu nisi ipsum ut minim consectetur eiusmod nulla dolore est. Velit pariatur minim id culpa incididunt sint pariatur. Non dolor enim in cillum commodo in sit amet laborum sint nostrud et nostrud.</p><p>Non do non aliquip voluptate dolore irure laborum incididunt occaecat eu consectetur dolor enim. Tempor occaecat do culpa aliqua incididunt irure. Aute tempor cillum Lorem Lorem et aliqua commodo amet occaecat culpa. Esse quis dolor sit sit irure voluptate ut aliquip eiusmod. Quis dolor officia laborum cupidatat incididunt nostrud.\n\nIn velit sint ipsum id culpa ea ad proident minim ea pariatur consectetur nisi incididunt. Velit esse laboris et aliqua laborum. Lorem quis ad eiusmod laboris exercitation. Commodo consequat sunt est fugiat commodo ullamco dolor velit elit laborum. Sint labore deserunt nostrud esse. Anim ut anim esse magna adipisicing aute ullamco sint quis anim dolor pariatur aliquip. Cillum excepteur amet ea anim nulla sit voluptate eu culpa dolore enim magna reprehenderit.\n\nIpsum deserunt fugiat nisi officia magna nisi reprehenderit do magna. Qui ipsum reprehenderit elit amet veniam ea laboris amet ut aliqua fugiat. Ut ut non in eiusmod non quis ad proident.\n\nReprehenderit sit Lorem officia ex consectetur non sint labore laboris commodo proident cillum deserunt. Velit proident duis do tempor dolor exercitation minim dolore. Veniam irure nulla anim id elit sunt ex incididunt anim et dolore. Dolore magna aute ipsum non laborum aliqua dolor ullamco culpa commodo proident.\n\nNon nisi deserunt labore sint eu quis dolore id mollit. Est ex quis non mollit labore minim et aliquip aute culpa ea. Enim sunt sunt occaecat nisi est consequat nulla. Laboris non cillum sunt et sint dolor eiusmod eu reprehenderit mollit occaecat mollit. In sunt id amet cillum nulla culpa reprehenderit aute tempor dolore aliqua fugiat incididunt. Pariatur id proident reprehenderit labore dolor culpa nisi cupidatat duis. Nostrud Lorem Lorem ipsum incididunt.</p>",
    summary:
      "Id enim reprehenderit consequat nostrud ad irure. Duis in anim Lorem magna duis incididunt duis do ullamco. Velit incididunt exercitation tempor occaecat laboris quis ea sint ut aliquip. Nisi consectetur enim voluptate ea incididunt elit nulla irure nisi voluptate. Proident dolore do reprehenderit minim eiusmod dolor aliqua. Velit officia excepteur reprehenderit adipisicing aliquip incididunt aute qui.",
    docNumber: "38 15 6(g)",
    docType: "policy notice",
    title: "aute aliquip est irure qui do"
  },
  {
    office: {
      title: "Office of culpa ipsum",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sat Apr 08 2017 09:49:45 GMT+0000 (UTC)",
        effectiveDate: "Mon Jan 01 2007 21:24:01 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Fri Apr 07 2017 18:57:19 GMT+0000 (UTC)",
        effectiveDate: "Wed Mar 29 2006 02:57:29 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sat Feb 18 2017 21:26:56 GMT+0000 (UTC)",
        effectiveDate: "Sun Jul 15 2001 08:27:32 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["CDC"],
    body:
      "<p>Dolor minim proident reprehenderit elit. Qui proident excepteur elit id sit excepteur nisi mollit irure ad magna. Sunt duis ad exercitation quis incididunt pariatur sint sit fugiat fugiat Lorem sunt. Nulla fugiat Lorem ut consequat nisi culpa commodo aliqua. Non aliquip incididunt nisi nisi qui adipisicing ullamco duis exercitation fugiat mollit fugiat magna. Ex eiusmod culpa ea adipisicing. Lorem dolore nulla qui velit enim culpa reprehenderit velit deserunt amet ullamco ex veniam veniam.</p><p>Cupidatat officia mollit non aliquip fugiat culpa voluptate aliquip dolor sit eu consequat labore. Anim laboris ullamco excepteur ad adipisicing amet exercitation nulla proident esse quis cillum. Anim ea elit quis dolore laborum et consectetur ullamco. Duis anim exercitation minim pariatur eiusmod eiusmod duis elit nulla excepteur nulla id. Nisi eiusmod consectetur commodo laboris aute consequat dolor consectetur culpa non mollit qui ex. Reprehenderit dolor reprehenderit enim adipisicing nulla anim. Lorem pariatur sit sunt pariatur dolor cillum adipisicing exercitation amet non commodo.\n\nEst ipsum elit eiusmod officia proident ipsum Lorem commodo culpa dolor nostrud voluptate. Do pariatur magna ipsum do consequat nostrud. Deserunt officia eiusmod consectetur occaecat incididunt voluptate tempor sit laboris. Occaecat aliqua excepteur ut voluptate eiusmod dolore et. Dolor eiusmod sit minim qui deserunt sint. Laboris occaecat sunt dolor excepteur ullamco ullamco laboris. Enim aute anim do cupidatat officia anim enim.\n\nCommodo voluptate minim pariatur sint laboris laboris esse pariatur labore dolor. Ad irure dolore exercitation occaecat magna laboris aliqua exercitation. Ex anim sit et ea amet ex.</p><p>In est ea culpa elit ex tempor reprehenderit ut. Velit labore ullamco nostrud excepteur irure elit Lorem aliquip fugiat nulla. Elit dolore velit ea do duis consequat. Eiusmod ipsum proident aute eiusmod fugiat nulla quis duis dolore irure Lorem minim dolore.\n\nPariatur aliqua incididunt sint cupidatat magna dolor reprehenderit occaecat. Ipsum velit aute eu aliqua. Veniam officia ea ullamco in occaecat aliqua ipsum sunt aliquip sunt velit ea. Sint ea labore nulla deserunt excepteur cillum aliquip cupidatat officia aute sint labore ea.\n\nUt excepteur tempor nulla est. Laborum incididunt culpa incididunt cupidatat elit. Enim sit quis minim duis. Do irure anim duis et ullamco dolor ea nisi aliqua enim. Magna dolore sunt ullamco Lorem esse non dolor ut.\n\nSit cillum quis commodo aliqua officia minim veniam culpa. Lorem commodo nisi nisi minim irure. Ullamco dolore id voluptate sint do. Amet elit do adipisicing velit ex laboris. Dolor sit officia sit tempor magna irure sint. Et irure veniam proident mollit deserunt voluptate. Voluptate reprehenderit irure exercitation nisi qui reprehenderit irure ullamco laboris voluptate aute nulla.\n\nDolor voluptate sunt culpa minim labore cillum aute nisi cupidatat quis cillum aliquip ullamco nulla. Lorem culpa est sint irure ea aliqua proident cillum irure Lorem pariatur mollit. Est culpa consectetur elit laboris occaecat deserunt sint sunt ullamco. Ad reprehenderit incididunt anim consectetur ex pariatur eu id eiusmod aute commodo.</p><p>Voluptate Lorem adipisicing ad ex esse ipsum proident labore incididunt velit voluptate magna. Consectetur excepteur nisi ut tempor labore sit occaecat do adipisicing Lorem pariatur nostrud dolore aliquip. Occaecat ad laborum voluptate adipisicing adipisicing do id exercitation dolore voluptate proident est ipsum. In magna minim id mollit Lorem adipisicing do ad labore pariatur qui aliqua irure aute. Enim ipsum ea adipisicing officia laboris Lorem commodo aute dolor incididunt id cupidatat.\n\nDolore ut eu qui irure elit cupidatat ut et. Exercitation aliqua ut consequat nulla in exercitation sint commodo velit amet est. Nisi exercitation ea magna deserunt. Fugiat aliqua dolore et mollit in ullamco officia dolore et. Laboris exercitation consectetur veniam ut anim incididunt nisi reprehenderit anim amet ut exercitation aliqua. Irure exercitation sit mollit velit sit Lorem quis aliquip id cupidatat magna in occaecat.\n\nDolore id ipsum amet aute nisi in ullamco id. Pariatur veniam fugiat nisi nulla elit ex nulla. Et tempor non est ut non laborum consequat nulla eiusmod mollit aliquip ipsum consectetur elit.\n\nMinim id dolor ut elit adipisicing occaecat dolore officia labore laboris mollit esse fugiat. Ipsum et adipisicing eiusmod officia laborum qui et velit nulla est. Sint consequat in tempor voluptate eiusmod eu voluptate sint est pariatur exercitation velit tempor tempor. Velit velit non nisi culpa aliqua consequat fugiat sunt officia qui nostrud. Amet nulla ad eiusmod Lorem sint elit laboris adipisicing Lorem do in.\n\nNon sit duis incididunt sit sunt tempor est quis consectetur deserunt esse labore pariatur voluptate. Quis mollit enim veniam fugiat amet. Ipsum veniam adipisicing reprehenderit culpa ut anim irure aliqua fugiat pariatur consequat amet irure.</p>",
    summary:
      "Velit tempor anim dolor dolor. Enim amet esse dolore tempor minim dolore in voluptate eu duis pariatur ut excepteur deserunt. In minim reprehenderit mollit ea cillum ad exercitation ea laboris in voluptate in elit. Aliquip excepteur exercitation enim labore ullamco sit officia minim ad magna duis. Non ea ea nulla ex officia nisi deserunt et et tempor.",
    docNumber: "1 11 9(g)",
    docType: "form",
    title: "mollit Lorem anim cupidatat aliquip in"
  },
  {
    office: {
      title: "Office of magna eu",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Tue Jul 11 2017 15:40:20 GMT+0000 (UTC)",
        effectiveDate: "Wed Oct 12 2005 16:03:34 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sun Mar 05 2017 16:55:52 GMT+0000 (UTC)",
        effectiveDate: "Mon Nov 12 2007 08:38:33 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sun Apr 30 2017 19:25:15 GMT+0000 (UTC)",
        effectiveDate: "Wed Nov 01 2006 10:06:29 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["501(c)"],
    body:
      "<p>Irure aute incididunt mollit ad aliquip amet ea excepteur nostrud Lorem consectetur. Officia nisi ad aliquip officia ea adipisicing officia quis incididunt. Ea est consectetur veniam est do et. In amet duis velit cillum enim eu nulla aliqua laboris pariatur. Do mollit consectetur sunt duis aliqua irure nulla magna ipsum incididunt.</p><p>Magna ullamco veniam veniam aliqua non non tempor fugiat elit reprehenderit anim. Irure officia ullamco excepteur quis voluptate sint id ut aute. Ad magna reprehenderit est veniam adipisicing. Ut dolor magna ipsum aliquip culpa. Culpa laboris velit Lorem aliqua amet magna duis reprehenderit veniam pariatur.\n\nEx proident voluptate eiusmod irure consequat veniam. Velit Lorem nulla adipisicing magna occaecat laborum fugiat ad commodo eiusmod consequat cillum ullamco commodo. Esse dolore est deserunt ipsum. Deserunt qui proident tempor consectetur anim nostrud dolore esse minim id dolore veniam dolore. Id qui velit non quis. Minim amet elit aute dolore irure cupidatat laborum ullamco laboris pariatur labore ipsum eu.\n\nVelit enim commodo sit pariatur cupidatat pariatur in est cupidatat velit tempor officia excepteur esse. Aute enim minim commodo anim ut nulla dolor laboris Lorem labore. Eu elit cillum culpa esse cillum. Reprehenderit laboris duis labore laborum. Sit velit cillum mollit Lorem sit non in eu velit incididunt ad velit. Sunt sint velit deserunt proident est.</p><p>Amet voluptate non culpa voluptate et est id ex labore incididunt aliquip nostrud. Laboris occaecat voluptate elit incididunt duis ipsum dolor proident duis non veniam. Dolor ea cupidatat ut incididunt aliquip dolor fugiat irure occaecat laboris sint pariatur culpa voluptate. Laboris et dolore culpa aliquip ullamco deserunt id. Cupidatat labore amet elit quis consectetur minim in reprehenderit culpa esse. Laborum culpa est et esse eu ut est veniam consectetur velit id.\n\nSunt aliqua laborum duis cillum nostrud excepteur minim voluptate excepteur. Enim sunt aliqua excepteur amet. Tempor consectetur duis quis anim aute in commodo est. Ea aute cupidatat duis consectetur consectetur do dolore occaecat incididunt non laborum ipsum.\n\nEnim qui commodo eu magna. Elit enim ad veniam occaecat duis consequat id quis deserunt fugiat exercitation. Ut qui do reprehenderit fugiat reprehenderit elit sint est aliqua ipsum. Ex aliquip occaecat occaecat sit laborum dolore deserunt aliquip do proident quis anim. Irure consequat Lorem aute aliquip cupidatat proident ipsum nulla aliquip. Lorem nulla est deserunt occaecat qui culpa labore enim amet commodo ut adipisicing ipsum qui. Eiusmod culpa ipsum non aute amet et sunt consectetur aute adipisicing fugiat dolor.\n\nCupidatat nulla qui veniam aliqua adipisicing labore mollit consectetur nostrud elit tempor sunt culpa. Nisi pariatur duis minim esse magna ea aliquip minim et Lorem amet exercitation ad cupidatat. Ipsum Lorem in consequat Lorem quis voluptate sunt exercitation commodo.\n\nEst culpa ut nulla proident occaecat laboris excepteur exercitation cillum officia. Consequat ad ad id amet deserunt in quis dolor incididunt. Amet anim occaecat nostrud eu veniam.</p><p>Non eu excepteur minim anim do amet exercitation nostrud consequat. Laboris irure elit laboris do. Cillum elit non cupidatat est anim commodo culpa adipisicing enim consectetur dolor labore elit. Aliqua velit sunt voluptate et voluptate eu velit sit minim.\n\nEnim et deserunt esse laborum fugiat sint proident occaecat. Id non ea nostrud occaecat consequat tempor pariatur dolore non deserunt. Sit magna ipsum laborum eiusmod culpa enim dolore minim cupidatat culpa.\n\nExercitation amet dolore culpa pariatur laborum. Occaecat Lorem velit Lorem minim ullamco nulla ullamco esse incididunt et. Minim non nostrud et excepteur fugiat nulla consequat proident in duis incididunt est dolore.\n\nSunt laborum veniam laborum incididunt occaecat. Veniam magna in elit do eu. Et aute pariatur nostrud qui voluptate incididunt nostrud quis proident consectetur ad ea nostrud. Voluptate est commodo sit nisi incididunt consequat mollit aliqua commodo. Ullamco cupidatat cillum et reprehenderit exercitation magna nisi. Pariatur aute ut commodo esse velit.\n\nQuis sint commodo veniam occaecat fugiat cillum ea cillum ad laboris. Proident reprehenderit enim eu velit. Voluptate exercitation labore labore excepteur labore anim irure minim officia deserunt eiusmod ea.</p>",
    summary:
      "Irure id exercitation ea occaecat ullamco proident. Fugiat aliquip laboris enim non. Quis aliqua eu dolore adipisicing occaecat culpa tempor excepteur sit sunt.",
    docNumber: "33 35 4(g)",
    docType: "sop",
    title: "sint consequat magna ipsum do sint"
  },
  {
    office: {
      title: "Office of magna est",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Thu Apr 20 2017 09:40:59 GMT+0000 (UTC)",
        effectiveDate: "Mon Jan 16 2012 23:21:23 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sat May 20 2017 21:59:22 GMT+0000 (UTC)",
        effectiveDate: "Sun May 02 2004 16:11:56 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sun May 14 2017 15:26:31 GMT+0000 (UTC)",
        effectiveDate: "Mon Jan 14 2013 11:03:19 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["CDC"],
    body:
      "<p>Ea labore eiusmod amet incididunt amet aliqua laboris non nisi commodo velit do. In do amet irure consequat. Quis velit deserunt tempor quis amet veniam ea dolor ad esse.</p><p>Incididunt commodo ullamco proident incididunt. Excepteur labore sit ut ipsum occaecat proident proident fugiat. Laboris sint ut Lorem magna deserunt.\n\nAliquip adipisicing do dolor voluptate fugiat officia magna eiusmod consequat voluptate aute ea reprehenderit. Nulla irure non ullamco ea ullamco voluptate occaecat laborum aliqua ex duis. Culpa est excepteur reprehenderit id cillum nostrud ut adipisicing laborum cillum.\n\nFugiat excepteur velit veniam sit quis sit sunt dolore cillum aliqua eu laborum. In eiusmod commodo velit veniam et commodo amet laborum occaecat consequat dolor qui sint. Labore consectetur nisi irure mollit mollit laboris magna nostrud culpa. Ea Lorem cillum id velit dolor. Ullamco anim aliquip velit elit. Amet proident labore id esse aliqua nisi exercitation cupidatat.</p><p>Et pariatur reprehenderit Lorem cillum dolore. Dolor et nostrud nulla veniam deserunt laborum duis commodo labore amet labore veniam dolor. Eu id id nulla velit. Nostrud exercitation voluptate eu reprehenderit ea quis. Irure ex nisi quis in pariatur est nostrud. Non culpa cupidatat non velit et fugiat proident est fugiat voluptate.\n\nEiusmod sunt exercitation labore deserunt enim labore consequat nulla consequat. Occaecat labore consequat nulla culpa voluptate pariatur. Adipisicing laboris fugiat proident elit duis Lorem ipsum eiusmod non do ad. Occaecat velit sunt reprehenderit incididunt culpa do est magna est nisi. In veniam dolor Lorem reprehenderit in eu labore elit occaecat non.\n\nIn do id quis dolor voluptate magna officia fugiat exercitation enim irure laboris commodo id. Enim occaecat irure fugiat laboris laborum excepteur occaecat minim ad consequat. Mollit consequat quis consectetur eiusmod in dolor labore anim incididunt laborum. Cillum commodo aute non commodo nulla nostrud ad. Adipisicing amet magna fugiat cupidatat labore elit mollit cillum voluptate eiusmod est quis eiusmod. Pariatur amet ex officia laborum est adipisicing non duis sunt amet fugiat. In aliquip Lorem tempor cillum.\n\nQui et sint nostrud proident proident laboris nostrud sunt. Dolore laboris commodo aliqua ipsum velit. Enim aute adipisicing magna mollit sint enim id cupidatat tempor incididunt incididunt aute.\n\nAd nulla commodo dolor id elit duis nostrud quis exercitation fugiat sint nostrud. Est nisi sint consequat officia. Voluptate eu elit ullamco ad adipisicing ex laborum ut. Ullamco eiusmod enim reprehenderit occaecat nisi velit ad.</p><p>Laborum consectetur cupidatat ut dolore sit cupidatat deserunt nostrud et. In excepteur deserunt non ad velit veniam sit enim irure do laborum. Aliquip ipsum aliquip nostrud tempor excepteur exercitation elit eiusmod ipsum. Excepteur id adipisicing mollit cupidatat labore ex esse non cupidatat irure nulla aliquip qui adipisicing. Deserunt ipsum dolore exercitation enim ea cillum enim velit enim nisi duis nulla adipisicing. Fugiat Lorem dolor reprehenderit cillum officia.\n\nConsectetur sunt occaecat reprehenderit officia quis. Commodo Lorem magna proident do exercitation sit incididunt quis proident fugiat incididunt occaecat. Aliqua tempor deserunt amet eu magna in ex nisi.\n\nExercitation voluptate occaecat excepteur sit consequat quis Lorem nisi ad tempor. Mollit voluptate cupidatat ex id reprehenderit quis occaecat reprehenderit. Dolor pariatur culpa tempor deserunt labore eiusmod cupidatat ad nulla sunt cupidatat qui voluptate quis. Do elit voluptate eiusmod in aliqua laboris fugiat sint nisi dolor et qui dolor amet.\n\nExercitation sint duis in eu quis velit. Exercitation do ea mollit eiusmod exercitation elit et do laboris. Voluptate occaecat mollit ea sit elit deserunt aliquip non anim. Do nostrud laborum consectetur ex. Sit sit ut laboris sit nulla non ad mollit dolore velit esse velit sit. Eiusmod magna sit elit anim.\n\nConsequat magna fugiat voluptate minim nulla reprehenderit commodo aliqua elit ipsum nisi esse. Consequat sit duis nisi in anim veniam enim aliquip sit dolor ut. Sint eiusmod esse ex et voluptate irure magna reprehenderit. Fugiat exercitation dolore proident consequat proident ad qui.</p>",
    summary:
      "Velit velit consequat tempor deserunt ex ex culpa minim id ut cupidatat est. Deserunt et magna elit dolore ea. Ut sunt laboris reprehenderit aute aliquip ex consectetur deserunt laboris officia mollit proident irure exercitation. Velit fugiat sit est minim adipisicing ut elit Lorem id labore. Ad occaecat qui dolore ad consequat fugiat ex dolore cillum amet ut ullamco mollit sint.",
    docNumber: "18 9 8(g)",
    docType: "sop",
    title: "sit excepteur sit mollit id duis"
  },
  {
    office: {
      title: "Office of ut aliqua",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sun May 07 2017 05:10:00 GMT+0000 (UTC)",
        effectiveDate: "Sun Apr 21 2002 23:56:38 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sat Jul 01 2017 07:38:31 GMT+0000 (UTC)",
        effectiveDate: "Mon Oct 31 2016 18:03:38 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Wed May 31 2017 15:49:12 GMT+0000 (UTC)",
        effectiveDate: "Thu Feb 03 2005 15:22:25 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["7(a)"],
    body:
      "<p>Esse cupidatat elit minim ea. Ad id aliqua non minim reprehenderit excepteur. In irure non in cillum ut ullamco sint commodo nulla velit incididunt. Consequat commodo reprehenderit elit et minim commodo veniam culpa consectetur eu incididunt qui consequat. Lorem nulla non ullamco incididunt. Lorem eu cillum in pariatur proident laboris consequat occaecat exercitation do ullamco ex laboris occaecat. In eu deserunt exercitation nulla cupidatat eiusmod dolore in do.</p><p>Reprehenderit duis nisi adipisicing nostrud nulla. Aute anim incididunt voluptate eu occaecat culpa. Culpa quis sit est anim velit fugiat aliqua sint aliquip elit magna voluptate. Laborum et duis do consequat nulla veniam. Ipsum deserunt nostrud fugiat ex pariatur. Aliqua irure tempor cillum deserunt nostrud. Ex nostrud tempor cupidatat id tempor amet sunt velit magna anim nulla.\n\nNulla nulla esse adipisicing aliquip magna amet amet voluptate fugiat veniam. Occaecat anim ullamco velit sit adipisicing fugiat exercitation culpa qui reprehenderit id duis amet id. Cupidatat in labore ex mollit cillum sunt eiusmod.\n\nFugiat nisi enim veniam cillum nostrud non aute elit veniam reprehenderit do aute mollit. Laboris velit laboris excepteur tempor. Amet cupidatat id dolore consectetur enim irure tempor commodo est. Non nulla minim esse elit culpa amet consectetur consectetur. Aute do laboris exercitation sint laborum velit mollit aliquip nostrud labore id magna.</p><p>Enim dolor ex amet id ex laboris occaecat nisi. Sint est veniam commodo duis aliquip dolore amet. Eu irure ad velit proident cupidatat mollit sit velit labore pariatur dolore fugiat incididunt cillum. Reprehenderit exercitation reprehenderit reprehenderit voluptate aliqua reprehenderit incididunt. Ex proident ullamco dolor dolor sit aliqua culpa adipisicing est commodo cillum nisi commodo.\n\nEt quis nisi dolore voluptate. Sit fugiat ut proident elit aliquip minim dolor aliqua Lorem enim elit id laboris aliqua. Cupidatat ex nulla elit sint proident adipisicing nisi. Culpa qui incididunt in id nisi dolore non labore nulla et. Nostrud amet in est et ipsum in commodo fugiat proident.\n\nEiusmod pariatur cillum occaecat dolor cupidatat mollit incididunt proident est. Minim aute cupidatat commodo cupidatat fugiat tempor minim fugiat. Cupidatat voluptate ipsum consequat velit sit laboris elit veniam reprehenderit nulla id consectetur non ut. Aute elit eu ullamco Lorem reprehenderit commodo sint laboris laborum consequat excepteur elit elit velit. Enim veniam aliquip do duis incididunt. Et incididunt duis magna non proident elit ipsum eu id. Nostrud aliquip eiusmod do commodo cupidatat culpa ea do esse mollit aliquip anim.\n\nProident officia qui ex aliquip consequat et magna minim excepteur ut cupidatat incididunt dolor. Nulla non proident pariatur laboris sit id ad. Laborum ipsum laboris tempor laborum dolore reprehenderit exercitation quis adipisicing ullamco. Adipisicing elit commodo eiusmod labore proident mollit.\n\nEx do incididunt consequat sunt sint qui tempor laboris labore nostrud eiusmod. Est ex ullamco aliqua elit consectetur quis labore. Quis Lorem velit nostrud deserunt eu veniam do duis occaecat. Incididunt fugiat id dolore commodo in nisi Lorem est proident cillum consectetur. Cillum sunt ut aliqua est sint labore non est ad magna laboris. Ullamco eiusmod esse amet magna pariatur ad dolore reprehenderit ea minim fugiat sunt Lorem.</p><p>Velit duis anim labore nisi minim. Culpa magna amet aliqua nisi exercitation Lorem id sit Lorem. Est ad ea id do elit. Non nulla veniam fugiat quis quis non occaecat minim consectetur exercitation ipsum adipisicing ipsum reprehenderit. Tempor sint nisi laboris officia.\n\nLabore tempor laborum ea occaecat nulla sit. Quis adipisicing enim nulla aute enim commodo officia. Cupidatat sit sit veniam cupidatat exercitation duis. Cillum ex aliqua voluptate mollit commodo mollit aute non incididunt sint adipisicing deserunt.\n\nCulpa amet pariatur labore dolore ea amet mollit voluptate cupidatat incididunt occaecat non laborum. Officia dolor reprehenderit excepteur dolore anim reprehenderit elit veniam non excepteur duis adipisicing. Nostrud laborum consectetur esse sit amet non exercitation velit exercitation ex ad. Consequat exercitation proident veniam proident veniam pariatur dolor nisi ad sunt. Laboris non excepteur consectetur et eiusmod labore est ut aliqua pariatur aliquip dolore do officia. Quis velit exercitation laborum ipsum officia esse anim consectetur dolore amet velit. Labore sit id adipisicing laborum in exercitation in aute aliquip velit.\n\nSit Lorem amet consequat irure eu proident proident aute elit in fugiat excepteur. Cupidatat magna amet elit eu cupidatat aliqua consequat laboris. Pariatur exercitation est sint nostrud nulla consequat culpa anim. Dolor cupidatat consectetur ipsum voluptate deserunt incididunt commodo laborum nulla nulla duis aliqua in.\n\nCommodo veniam pariatur consequat voluptate consectetur aliquip nisi pariatur consequat commodo aliquip. Aliquip nisi tempor culpa incididunt duis ipsum et aute. Enim quis enim in veniam id esse ex tempor pariatur amet. Amet ex exercitation velit proident ullamco amet eu velit duis consequat. Minim sint nostrud in dolor aliquip occaecat qui veniam eu id incididunt esse pariatur.</p>",
    summary:
      "Mollit anim minim ea voluptate tempor. Sit mollit aliquip nisi qui incididunt laborum sunt id veniam sunt sit. Ut pariatur eiusmod dolore nulla magna culpa irure proident. Occaecat quis velit consequat dolore exercitation sit tempor elit velit et sunt ipsum. Adipisicing adipisicing id exercitation do in anim quis. Et ut mollit fugiat cupidatat ut minim anim commodo do adipisicing in. In commodo nisi laborum labore occaecat amet nostrud enim occaecat non velit consectetur.",
    docNumber: "13 11 4(g)",
    docType: "sop",
    title: "duis ullamco sunt dolor officia commodo"
  },
  {
    office: {
      title: "Office of veniam eiusmod",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sun Jul 16 2017 01:42:58 GMT+0000 (UTC)",
        effectiveDate: "Fri Dec 10 2004 23:07:01 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Fri Feb 24 2017 06:48:07 GMT+0000 (UTC)",
        effectiveDate: "Sun May 18 2003 10:14:45 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sat May 20 2017 10:52:50 GMT+0000 (UTC)",
        effectiveDate: "Tue Oct 12 2010 12:53:24 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC"],
    body:
      "<p>Sint esse ut fugiat eiusmod quis irure ad. Id reprehenderit dolore ad deserunt nostrud Lorem ea exercitation amet excepteur tempor adipisicing. Consectetur labore commodo commodo incididunt nisi officia dolor commodo dolore duis sint esse. Excepteur Lorem aliquip magna ullamco qui ea nostrud. Tempor in dolor quis magna cupidatat sunt magna consequat.</p><p>Nulla aute incididunt ipsum ut ex sit. Irure incididunt veniam magna ex est quis dolore deserunt do pariatur in. Anim tempor esse dolor veniam esse officia incididunt tempor Lorem eiusmod ad. Nulla reprehenderit aliquip et esse nisi ex aliquip esse elit et est fugiat proident. Nisi quis adipisicing nostrud nisi. Aute minim amet dolore in.\n\nSint aute cupidatat in magna ea. Labore cillum duis pariatur dolore dolor pariatur dolore aliquip est veniam. Voluptate culpa incididunt ex dolor. Ea nisi fugiat laborum sunt labore nostrud magna laboris mollit.\n\nCillum tempor ad laboris enim officia velit est ex voluptate officia aliquip duis. Proident reprehenderit eu ullamco esse minim nostrud dolor dolore nisi. Commodo quis sunt elit eu ea eu dolore ea aliqua incididunt dolore occaecat non qui. Do non officia elit qui in magna quis officia ex dolor anim culpa do.</p><p>Culpa consectetur est culpa magna eu labore in esse non reprehenderit reprehenderit ad. Mollit minim tempor id qui non enim ut. Reprehenderit mollit eu cupidatat ex non et consequat est sunt.\n\nVelit nostrud ea proident dolore commodo ut dolor aute officia amet officia ut. Esse amet enim exercitation et nisi ut culpa. Nulla in velit velit minim culpa pariatur exercitation ullamco. Velit elit ea aute do labore excepteur.\n\nMollit nulla exercitation occaecat labore ad ad qui proident amet proident cupidatat. Enim culpa aliqua excepteur ullamco. Qui est ullamco sit in reprehenderit.\n\nAnim nulla ipsum culpa id ipsum culpa commodo consectetur. Ad veniam occaecat minim ullamco occaecat cupidatat ex laborum aute excepteur aliquip. Exercitation nisi elit ut pariatur ad anim ea ad cupidatat laborum dolor velit do magna.\n\nNostrud velit ex aute irure in laboris ex pariatur veniam dolor eiusmod. Id sint duis consequat aliquip ea laborum aliquip exercitation ut in sit ut ullamco nostrud. Aliquip enim officia ad esse aute nisi et mollit.</p><p>Incididunt minim deserunt ut aute esse quis laboris cillum incididunt nisi deserunt. Duis ullamco in pariatur pariatur laborum voluptate Lorem voluptate consectetur elit. Ullamco velit ullamco aute reprehenderit ex esse consectetur in sit.\n\nVeniam cillum exercitation cupidatat pariatur amet eiusmod. Minim duis duis qui aliqua eiusmod. Id tempor sint ea labore pariatur cupidatat tempor cillum amet ex magna. Ex velit cupidatat Lorem veniam consequat.\n\nQuis elit aute sunt adipisicing eiusmod officia aliqua veniam cillum non nulla culpa. Cillum elit ullamco et anim cupidatat minim est commodo. Qui quis labore mollit aliqua. Eu qui cillum eiusmod magna incididunt dolor magna ut in ullamco sint magna. Aliquip esse proident duis elit irure ea officia enim anim. Aute est anim culpa qui do mollit culpa elit adipisicing laborum id tempor. Ad aliqua magna esse laborum esse pariatur aliqua adipisicing Lorem dolor nostrud.\n\nEx aute aute commodo ea exercitation labore. Nulla pariatur veniam irure aliqua ex ullamco qui proident in aliqua aliqua quis. Consequat est dolore irure sint aute. Proident irure mollit ad magna reprehenderit nulla.\n\nEt ea eiusmod ullamco Lorem id consectetur commodo. Mollit aliquip excepteur cupidatat consectetur consectetur aliquip excepteur et magna enim fugiat adipisicing. Aliquip eu nostrud velit veniam id labore est reprehenderit elit fugiat eu sit nulla in. Elit duis incididunt reprehenderit ex nulla. Excepteur sunt sunt adipisicing nulla reprehenderit commodo adipisicing. Dolore ad quis deserunt elit veniam esse laboris quis Lorem anim nisi voluptate sint. Adipisicing non excepteur veniam ea occaecat ad veniam ullamco incididunt cillum.</p>",
    summary:
      "Dolor sunt eu cupidatat esse quis et excepteur culpa cupidatat sunt ea enim labore. Ullamco occaecat quis anim cupidatat sit dolor reprehenderit ipsum cupidatat officia. Esse consectetur nisi do ea aliqua ullamco. Cillum fugiat mollit excepteur consequat. Irure mollit laboris magna exercitation.",
    docNumber: "47 29 2(g)",
    docType: "policy notice",
    title: "ea non laborum ad anim minim"
  },
  {
    office: {
      title: "Office of eu voluptate",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Thu Mar 09 2017 10:43:13 GMT+0000 (UTC)",
        effectiveDate: "Wed Mar 22 2006 02:32:34 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sun May 14 2017 04:13:20 GMT+0000 (UTC)",
        effectiveDate: "Sat Mar 16 2002 02:36:40 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Thu Apr 27 2017 01:43:19 GMT+0000 (UTC)",
        effectiveDate: "Sat Jun 25 2005 04:48:42 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC", "8(a)", "CDC"],
    body:
      "<p>Anim ipsum veniam amet sint. Occaecat do magna sint incididunt ex amet ullamco aliquip sunt. Eiusmod commodo anim reprehenderit cupidatat ullamco laboris dolore aute pariatur sit non labore fugiat aliquip. Cupidatat laborum ea sint nulla laborum. Proident commodo veniam amet elit non. Ut ad ad eu tempor excepteur in Lorem ea esse consectetur aliquip. Lorem sunt cillum aliqua anim esse proident sunt do aliqua minim consequat laboris tempor.</p><p>In deserunt consequat laboris ea nostrud nisi enim proident mollit ea irure in aliquip culpa. Duis labore excepteur eiusmod dolor in non adipisicing incididunt nisi adipisicing id ipsum. Officia quis in nisi pariatur et pariatur consequat do consequat occaecat ad consequat elit veniam. In enim aliquip consequat deserunt qui quis Lorem veniam aliquip dolore. Qui nisi laborum minim ipsum nisi nostrud labore consectetur dolor sint velit ullamco nulla. Duis laborum laboris magna est dolore proident laboris sit cillum deserunt mollit Lorem ut excepteur. Incididunt Lorem excepteur qui minim.\n\nDuis consectetur ea irure dolor dolor sint esse irure sit et. Consectetur aute reprehenderit esse non aliqua id sunt dolor fugiat. Pariatur eu aute ea labore minim excepteur proident excepteur mollit ex reprehenderit pariatur. Sit elit dolor eu dolor cupidatat consequat sint aliqua laborum deserunt sunt consequat. Adipisicing Lorem consectetur sint quis commodo sit minim velit. Incididunt commodo aute eiusmod magna fugiat culpa ad tempor sunt.\n\nCulpa aliqua laboris occaecat pariatur anim adipisicing reprehenderit Lorem. Qui sit cupidatat excepteur elit consectetur laborum voluptate voluptate esse reprehenderit non ex. Reprehenderit esse officia voluptate irure deserunt et nostrud fugiat aliqua dolor consequat culpa adipisicing exercitation. Proident ad est ullamco incididunt non. Pariatur incididunt laborum excepteur aliqua aute ut ea commodo quis ullamco laboris exercitation eu aute. Tempor minim veniam nulla dolore eu exercitation est et officia ex duis aliquip reprehenderit.</p><p>Esse eu consectetur nostrud labore cupidatat. Amet anim cillum enim cupidatat aute aliqua fugiat esse ipsum consectetur officia eu. Sit ut ullamco aute ipsum ipsum.\n\nIncididunt dolor aliqua eiusmod aliquip in fugiat consequat tempor nostrud eu quis eiusmod. Commodo fugiat eu in officia aute amet consectetur. Quis enim enim excepteur non Lorem anim aute laboris.\n\nNon veniam consequat amet sint pariatur adipisicing ad dolor ex excepteur do. In anim fugiat incididunt voluptate voluptate et cillum velit dolor cillum sunt. Est officia cillum mollit anim consequat et. Consectetur do officia labore aliquip elit voluptate eiusmod.\n\nNisi amet eiusmod in laborum ullamco ex eiusmod sit adipisicing. Culpa consequat magna ex enim aute. Sint deserunt proident id eu non duis nulla eiusmod duis nisi. Occaecat consectetur reprehenderit in dolore aute tempor in ad aute labore. Reprehenderit quis eu ut culpa do irure esse ex cillum incididunt dolore irure eu.\n\nVeniam aute Lorem consequat incididunt. Qui et ut eiusmod in. Quis fugiat dolor tempor duis non laboris nulla ipsum pariatur irure. Amet pariatur veniam proident sint veniam ex enim amet voluptate laborum dolore.</p><p>Consequat consectetur culpa velit laborum veniam. Quis anim irure nostrud in in ad cillum proident et nostrud. Laborum elit et proident consectetur ad reprehenderit et. Duis sint dolore eiusmod nulla ut aliqua non laborum eiusmod.\n\nCulpa aliquip occaecat ullamco minim officia do veniam irure excepteur eiusmod consequat. Reprehenderit sunt cillum proident veniam velit deserunt ea et. Officia eu elit duis eiusmod in velit. Consequat magna ad exercitation quis eu cupidatat excepteur eiusmod et consectetur cillum nulla.\n\nDeserunt eiusmod eu eu amet mollit velit. Sunt qui irure consequat deserunt Lorem. Tempor irure consequat proident ullamco excepteur Lorem. Deserunt ea consectetur ipsum voluptate tempor adipisicing esse aliqua.\n\nOfficia ullamco mollit ullamco occaecat est sint amet adipisicing sint occaecat. Esse aliquip consectetur adipisicing nostrud amet veniam aliquip. Laboris elit laboris dolore ullamco.\n\nEa cupidatat deserunt sit laborum labore Lorem magna exercitation. Fugiat mollit nisi do exercitation reprehenderit eu dolore magna id consectetur dolor aliquip. Ad aliqua magna quis reprehenderit incididunt laboris commodo occaecat commodo deserunt nostrud id do.</p>",
    summary:
      "Sunt est sint officia esse irure nulla commodo nostrud in. Minim nulla ut nulla incididunt proident anim nulla esse ipsum ut fugiat. Ullamco tempor proident tempor aliqua nostrud minim Lorem ut sint ad consectetur labore pariatur.",
    docNumber: "1 16 9(g)",
    docType: "sop",
    title: "elit officia fugiat aute sunt labore"
  },
  {
    office: {
      title: "Office of proident elit",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Fri Feb 10 2017 08:55:38 GMT+0000 (UTC)",
        effectiveDate: "Thu Apr 23 2009 08:14:58 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sat Apr 08 2017 13:07:01 GMT+0000 (UTC)",
        effectiveDate: "Mon Dec 10 2001 11:38:11 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Fri Jul 21 2017 11:06:53 GMT+0000 (UTC)",
        effectiveDate: "Fri Apr 28 2017 15:24:38 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC", "CDC"],
    body:
      "<p>Aliquip consequat ad in velit labore culpa aliqua voluptate. Qui sint cillum sint nostrud do amet. Lorem duis labore ex officia ea et sit magna aliquip veniam veniam id id. Exercitation sit sunt nulla fugiat. Exercitation eiusmod velit ad ipsum ex anim occaecat consequat ipsum Lorem Lorem id culpa.</p><p>Ipsum enim nulla officia magna ut. In culpa cupidatat aliquip est ad deserunt ullamco consectetur dolore ullamco exercitation. Esse magna sint officia tempor in mollit tempor eiusmod labore. Ut nisi ullamco aliquip dolore velit elit dolore.\n\nTempor eu incididunt do duis commodo aliquip nostrud incididunt mollit. Ad aliqua labore aliquip irure commodo laborum tempor fugiat irure. Deserunt quis occaecat esse labore amet officia culpa ex velit anim reprehenderit. Aute voluptate deserunt enim Lorem sit sint. Labore nisi est deserunt nisi labore qui et ipsum dolore voluptate sunt. Eiusmod ad Lorem et deserunt culpa in eu.\n\nElit eiusmod do cillum eiusmod excepteur. Veniam fugiat in mollit esse ex pariatur proident elit excepteur irure ex in sint. Sint est irure in cillum voluptate exercitation commodo culpa tempor est ullamco. Et incididunt aute dolor minim ex esse nostrud labore velit consequat et tempor laborum. Consectetur minim Lorem velit officia eiusmod nulla ad duis aute eiusmod dolore magna cillum. Labore anim sint enim eu dolore sint.</p><p>Est aliquip tempor minim enim non excepteur adipisicing proident. Irure in dolore ullamco est ad incididunt nulla Lorem aute ut laboris aliqua. Nostrud aliqua non eiusmod deserunt deserunt et pariatur sint laboris elit quis id ullamco. Mollit anim ad irure nisi sunt ullamco eiusmod dolor reprehenderit. Et deserunt ea veniam minim velit fugiat culpa mollit eu deserunt incididunt. Minim ea adipisicing labore velit esse ullamco qui.\n\nPariatur fugiat cupidatat veniam voluptate anim ut non cupidatat. Dolore ex aliquip magna magna excepteur. Aute elit deserunt enim anim ullamco sunt veniam ullamco eu deserunt consequat mollit qui Lorem. Esse deserunt aliqua sunt officia nostrud consequat occaecat dolor reprehenderit laboris amet excepteur commodo cupidatat.\n\nNostrud ipsum quis eu amet velit non. Dolore veniam velit qui culpa voluptate ad ad non aute aliquip Lorem. Fugiat laborum amet consequat nulla amet ipsum sit deserunt culpa laboris. Ea nostrud Lorem eiusmod dolor aliquip laborum officia dolore fugiat. Elit elit elit labore Lorem nisi elit elit ullamco incididunt non anim aliqua anim. Do aliqua non cupidatat ut consectetur sint consequat occaecat. Culpa laboris ea aliquip tempor.\n\nUllamco ex mollit qui ipsum magna duis cillum anim tempor est officia. Esse dolore culpa tempor veniam officia commodo. Anim aute duis tempor dolore officia ad anim pariatur fugiat ad consectetur magna.\n\nSunt nostrud commodo do amet id in quis nostrud incididunt. Ut do eiusmod nulla anim eiusmod fugiat sunt qui incididunt. Elit qui laborum excepteur labore nulla.</p><p>Do laborum labore occaecat ipsum laboris ea velit anim. Cillum et qui excepteur ullamco mollit aliqua consectetur laboris esse fugiat ex minim. Ea reprehenderit dolor consectetur ipsum occaecat. Laborum ea esse ullamco deserunt aliquip elit eu laborum veniam ipsum. Dolore elit do magna labore nostrud velit officia.\n\nEst nulla sint excepteur adipisicing ex irure labore. Nulla sint consectetur proident eiusmod pariatur enim aliqua. Consequat ipsum pariatur excepteur sunt ut voluptate dolore incididunt veniam labore dolor. Culpa fugiat voluptate irure enim dolore commodo nostrud aliquip ea exercitation laborum magna veniam. Ea commodo esse excepteur minim cupidatat. Et laborum sunt est laborum ex amet elit consectetur magna incididunt laborum anim tempor. Laborum aliquip labore tempor nostrud occaecat fugiat et nulla anim.\n\nLaborum adipisicing ullamco deserunt nostrud dolore. Ipsum ex magna proident incididunt. Nisi amet nostrud ex commodo. Commodo cupidatat reprehenderit tempor cupidatat dolore ullamco velit cupidatat quis exercitation et. Aliquip commodo ut nostrud veniam aute anim non tempor. Laboris culpa nulla Lorem aliqua ex proident dolor. Officia proident minim sint aliquip voluptate adipisicing velit aliqua laborum.\n\nIrure incididunt tempor ex enim tempor officia elit nulla incididunt magna tempor proident. Esse ex fugiat ipsum ut nostrud Lorem mollit. Consectetur adipisicing ex dolore aliqua veniam excepteur. Consectetur ex reprehenderit minim duis amet magna exercitation nostrud ut excepteur.\n\nVelit sunt quis proident exercitation proident duis mollit officia deserunt mollit laboris eiusmod laboris cillum. Consequat excepteur quis fugiat ex qui reprehenderit cillum sint ex ex in ipsum laborum magna. Id dolor minim cillum occaecat. Adipisicing duis incididunt nisi ex velit cupidatat. Dolore reprehenderit irure reprehenderit deserunt aute. Nisi deserunt duis ipsum non qui excepteur ipsum et id Lorem nostrud id ex.</p>",
    summary:
      "Velit ut enim ipsum culpa mollit. Veniam esse consequat incididunt laboris aliqua minim ad. Cillum nulla nisi laborum in quis occaecat ipsum ea. Tempor quis excepteur esse Lorem.",
    docNumber: "26 24 5(g)",
    docType: "form",
    title: "fugiat eu do quis aliqua ipsum"
  },
  {
    office: {
      title: "Office of irure do",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Tue Jul 04 2017 04:03:54 GMT+0000 (UTC)",
        effectiveDate: "Mon Jan 30 2017 08:58:31 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sun Feb 05 2017 13:14:10 GMT+0000 (UTC)",
        effectiveDate: "Tue Sep 05 2006 08:10:59 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sun Jan 08 2017 23:24:11 GMT+0000 (UTC)",
        effectiveDate: "Thu Dec 13 2012 06:24:35 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["CDC"],
    body:
      "<p>Do velit tempor ea ea. Adipisicing fugiat ea tempor reprehenderit eu eiusmod deserunt exercitation veniam qui. Labore non duis proident nisi commodo amet veniam. Officia duis pariatur nostrud consectetur irure sint voluptate eu eiusmod dolor incididunt. Do ea et ullamco laborum cupidatat laborum deserunt cillum. Irure nisi qui non non. Elit Lorem Lorem consequat incididunt.</p><p>Anim sunt excepteur ullamco exercitation nisi anim nulla ut ut ullamco voluptate veniam. Enim nisi dolore sit enim. Consectetur dolore id fugiat eu exercitation ad voluptate id sint adipisicing nulla dolor. Excepteur cupidatat aliquip est nostrud ex nulla ut reprehenderit ad. Deserunt do et enim voluptate.\n\nDolore elit excepteur dolore cupidatat veniam reprehenderit. Sit commodo aliquip voluptate do voluptate non esse aliquip incididunt officia esse. Proident laboris esse deserunt labore velit ex. Ad ad nulla aliqua fugiat. Nostrud velit occaecat excepteur eu qui reprehenderit nostrud cupidatat magna aliqua anim enim do irure.\n\nSit aliqua cillum quis officia Lorem irure quis nisi consequat. Laborum ad velit ipsum occaecat minim proident aliqua esse nisi officia. Tempor ea pariatur elit fugiat id ullamco non reprehenderit do. Enim eiusmod aute mollit ut anim veniam. Veniam pariatur minim laboris ipsum minim laborum fugiat sint amet nisi aliqua et anim adipisicing. Anim nostrud et et id aliqua voluptate veniam. Velit ex sunt proident non id non elit tempor ad cupidatat eiusmod.</p><p>Quis deserunt nisi cupidatat cupidatat laboris nisi in labore commodo non ut quis ad dolore. Officia ad ea commodo pariatur ad excepteur aute sint. Officia veniam dolor deserunt proident mollit qui enim. Veniam occaecat nisi eiusmod dolore labore eu exercitation veniam mollit anim consequat ullamco ex. Adipisicing laboris nisi minim eiusmod. Aliquip proident est tempor excepteur eu nostrud cupidatat ullamco ipsum elit exercitation.\n\nAdipisicing et laborum commodo aliquip esse. Est Lorem excepteur aute anim ipsum tempor velit culpa exercitation. Excepteur irure ex sunt nisi esse ut aliquip. Non nulla est minim exercitation duis cupidatat officia. Veniam laboris id id adipisicing ut enim mollit. Pariatur ex enim est cillum deserunt deserunt adipisicing ea amet culpa laboris enim.\n\nTempor nulla culpa incididunt sint non dolor cillum nulla. Elit eiusmod consectetur reprehenderit excepteur non non anim magna laborum nisi ipsum laborum fugiat. Fugiat aliquip laborum dolore ex ullamco amet reprehenderit irure est ut magna dolore occaecat laborum. Adipisicing ipsum minim excepteur laboris adipisicing dolor esse occaecat commodo. In ad mollit in in in.\n\nLorem labore elit elit pariatur ea voluptate aliqua id quis dolor mollit Lorem. Excepteur minim ullamco velit magna et velit mollit reprehenderit. Lorem est voluptate exercitation exercitation do ex amet fugiat cillum sunt. Fugiat magna exercitation reprehenderit occaecat. Ullamco amet qui proident reprehenderit adipisicing incididunt deserunt minim occaecat magna duis.\n\nMollit amet aliqua incididunt reprehenderit aute eiusmod culpa. Ad ea ex ut adipisicing ipsum minim mollit. Eiusmod exercitation fugiat duis ut amet adipisicing minim do. Nulla esse aliquip et aute consectetur deserunt non ipsum enim. Laboris cillum magna ea velit nostrud consectetur enim ex cillum incididunt mollit nisi.</p><p>Nisi aliquip consectetur cupidatat in nisi ipsum. Minim quis dolore irure sit anim laboris ea. Eu officia consectetur minim amet ad ea non proident nulla dolor laboris fugiat proident sint.\n\nIn duis ea sit ut Lorem ea et. Ullamco irure ea labore ullamco amet anim duis deserunt laboris ut. Aliqua magna deserunt ullamco sint eiusmod esse irure irure amet ea aliqua consequat. Minim sunt duis duis ex.\n\nCulpa fugiat sunt ea proident duis pariatur ad ex proident tempor culpa magna qui ut. Fugiat et officia deserunt ut. Culpa ipsum sunt aute consequat.\n\nMinim ex cillum cupidatat id laboris cupidatat commodo tempor. Veniam non adipisicing non tempor deserunt ullamco ea. Dolore consectetur fugiat aliquip nisi ea aute cillum ex aute nostrud excepteur. Ad id anim proident veniam fugiat. Sint reprehenderit enim ipsum incididunt aute consectetur Lorem exercitation tempor occaecat.\n\nCommodo culpa velit enim officia eiusmod tempor esse dolor irure consequat. Lorem exercitation deserunt anim nulla ullamco et id. Est ut laboris fugiat aliquip aliquip pariatur culpa sint proident ea mollit sunt reprehenderit. Proident cupidatat qui ea proident elit consequat elit veniam. Mollit fugiat adipisicing reprehenderit aliqua esse ut consectetur velit veniam pariatur qui qui. Exercitation cillum nostrud mollit velit.</p>",
    summary:
      "Irure dolor voluptate est excepteur. Reprehenderit proident fugiat dolore minim dolore dolore. Dolor occaecat qui irure occaecat. Enim sit commodo exercitation aliqua pariatur. Et laboris nostrud labore incididunt laboris elit non ullamco in reprehenderit magna magna et.",
    docNumber: "15 32 7(g)",
    docType: "form",
    title: "adipisicing sunt enim officia sunt proident"
  },
  {
    office: {
      title: "Office of Lorem cillum",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Fri Apr 21 2017 21:54:03 GMT+0000 (UTC)",
        effectiveDate: "Mon Aug 05 2002 11:08:59 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Thu Apr 27 2017 20:06:58 GMT+0000 (UTC)",
        effectiveDate: "Fri Mar 08 2013 20:49:12 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sun Jun 11 2017 08:49:48 GMT+0000 (UTC)",
        effectiveDate: "Thu Oct 13 2005 16:03:20 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["7(a)"],
    body:
      "<p>Labore ea cillum esse labore culpa exercitation. Et incididunt magna mollit aliqua dolor mollit. Minim consectetur fugiat deserunt reprehenderit officia tempor nisi ex. Ex ad qui pariatur sint incididunt labore dolor in id. Aliqua in amet velit nulla in do voluptate occaecat non ea enim aute. Aliqua consequat eu dolor pariatur sit et et culpa.</p><p>Aute est ex id commodo elit est anim sit occaecat ipsum consequat minim sunt reprehenderit. Id ea aliquip et labore. Deserunt est aliqua in duis non consequat quis enim magna nisi deserunt amet. Est ad ex labore Lorem culpa. Id elit enim anim nisi culpa qui mollit ea elit non mollit consequat reprehenderit voluptate. Ex sint ex in nulla mollit mollit excepteur enim sunt ea.\n\nExcepteur est deserunt nostrud do ullamco cupidatat culpa ex labore irure dolore. Elit ullamco nisi quis sit aliquip. Laborum ea adipisicing do commodo cillum consequat. Enim occaecat proident enim nulla dolore ex deserunt esse et incididunt duis consequat nostrud nulla. Ea nisi pariatur proident irure qui id incididunt occaecat. Aliquip aliquip duis ullamco excepteur exercitation laborum. Aliquip magna incididunt in cillum consectetur labore labore minim labore irure ipsum occaecat.\n\nVoluptate minim enim Lorem cupidatat amet velit officia eu esse. Consequat sit non cupidatat sit proident labore ad magna ex in ad irure culpa et. Ut proident nisi cillum excepteur aliquip voluptate sint id anim. Dolor aliquip pariatur elit amet. Aliquip exercitation labore in eiusmod veniam velit. Eiusmod eiusmod incididunt elit est sunt cupidatat sint consequat duis do dolor voluptate proident.</p><p>Laboris voluptate cillum magna eiusmod aliqua dolor consectetur in esse mollit amet excepteur Lorem. Eu amet incididunt ullamco ea sit laboris cupidatat. Deserunt commodo magna Lorem mollit elit nulla veniam tempor mollit proident dolor laboris laboris culpa. Incididunt labore fugiat et ullamco labore anim. Amet eu id laborum nostrud ea mollit aliquip anim nisi officia anim sint.\n\nUt adipisicing dolore consectetur sit ipsum fugiat. Id labore tempor sint fugiat do sint commodo nulla cupidatat id. Cupidatat et aliquip proident nostrud ullamco cupidatat et velit sit pariatur fugiat est.\n\nDeserunt reprehenderit adipisicing laboris excepteur labore minim quis pariatur labore do Lorem ad voluptate irure. Aliquip ea dolor dolore pariatur velit ex irure et qui eiusmod laborum laborum sunt sit. Est sunt duis occaecat commodo duis elit do dolore quis qui reprehenderit.\n\nProident adipisicing ea aliquip sint ipsum labore proident. Ex cupidatat pariatur do aliqua. Labore sunt ipsum proident ipsum officia tempor aliqua anim.\n\nUt esse proident proident consectetur do exercitation sint sint eiusmod sit. Fugiat adipisicing elit non pariatur. Ullamco ipsum elit mollit exercitation dolor enim mollit proident ipsum ea minim voluptate proident officia. Occaecat mollit aliquip cupidatat est nisi pariatur fugiat.</p><p>Minim exercitation in nisi non occaecat consectetur amet proident aliqua nisi labore commodo quis laboris. Aute minim dolore aute incididunt sunt Lorem commodo labore labore esse deserunt proident nisi ad. Reprehenderit cupidatat eu labore et.\n\nLorem sit incididunt laboris anim proident voluptate est laboris occaecat irure nisi aliqua Lorem eu. Ad cupidatat officia ut culpa ut. Adipisicing commodo reprehenderit minim voluptate adipisicing quis nisi deserunt.\n\nLorem ex aute sit Lorem in proident commodo sit velit cupidatat. Consectetur irure do fugiat elit velit qui minim aute deserunt. Nulla quis adipisicing consequat amet cillum consectetur deserunt aliqua. Laborum ipsum cupidatat dolore consectetur consequat quis qui aute nisi ea et velit excepteur officia. Eiusmod duis nisi commodo occaecat mollit sint officia.\n\nExcepteur mollit eiusmod magna incididunt elit est ea pariatur nisi Lorem irure excepteur fugiat duis. Anim exercitation incididunt non aliquip. Deserunt magna incididunt qui esse.\n\nEa culpa amet aliquip et eiusmod laborum nulla dolor pariatur aute tempor do nulla. Aliquip ullamco adipisicing dolore est cillum sit ullamco. Ad laborum aute non mollit incididunt ipsum aliquip officia sunt sunt. Consequat amet voluptate fugiat officia officia. Deserunt in laborum non incididunt officia velit esse voluptate veniam adipisicing do do mollit. Dolor laboris sint duis eiusmod voluptate duis magna dolore ullamco fugiat.</p>",
    summary:
      "Aliquip laborum incididunt elit adipisicing enim labore. Aute nulla sit adipisicing elit non fugiat. Cupidatat sunt nulla enim ad adipisicing enim voluptate fugiat consectetur. Proident consequat sunt sint fugiat non nisi sunt magna quis consectetur.",
    docNumber: "45 2 7(g)",
    docType: "policy notice",
    title: "do dolor excepteur nostrud ad fugiat"
  },
  {
    office: {
      title: "Office of minim Lorem",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Fri Apr 21 2017 09:52:45 GMT+0000 (UTC)",
        effectiveDate: "Sun Aug 03 2014 23:50:54 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Mon Mar 13 2017 07:28:24 GMT+0000 (UTC)",
        effectiveDate: "Sat Jan 08 2000 12:29:32 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Wed Apr 26 2017 15:45:44 GMT+0000 (UTC)",
        effectiveDate: "Tue Nov 13 2001 10:21:45 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC", "501(c)"],
    body:
      "<p>Sunt aliquip aute quis ex eiusmod deserunt duis quis nisi incididunt. Est aliqua aliqua sunt officia quis irure quis magna excepteur ipsum cupidatat fugiat duis. Amet fugiat anim non officia. Id duis id laborum elit aliquip irure cillum nulla velit officia Lorem ad ea. Commodo mollit enim ea proident anim. Mollit sunt eu occaecat proident laboris voluptate sit nulla quis sit eu ea.</p><p>Veniam voluptate voluptate amet aute sunt nostrud ea qui incididunt nulla cupidatat. Nisi exercitation duis proident consectetur do adipisicing laboris. Excepteur pariatur nulla irure magna exercitation cupidatat. Aliqua irure ex esse duis occaecat ea ullamco do ipsum dolore eu ullamco dolore. Sint excepteur dolor labore duis nisi proident irure officia mollit occaecat quis in. Ex ea commodo amet voluptate magna ea est deserunt officia ex pariatur irure.\n\nEt consequat irure in exercitation consectetur nisi officia sunt amet culpa in. Fugiat mollit velit sunt enim commodo. Reprehenderit consequat ad anim sit laboris est. Veniam tempor officia proident ea dolor est fugiat sunt deserunt elit aute commodo consectetur nisi. Ut esse anim qui tempor id anim ea aliqua cillum labore.\n\nDuis pariatur tempor magna id proident incididunt irure aute Lorem. Do laborum nostrud anim sit ex culpa reprehenderit excepteur amet magna sit aliquip. Nulla dolore ullamco voluptate magna consequat ex.</p><p>Officia consectetur ad sint veniam. Est eiusmod cupidatat in adipisicing anim aliquip reprehenderit aliqua voluptate excepteur mollit quis reprehenderit cupidatat. Non cillum dolore proident occaecat cupidatat veniam anim pariatur qui qui. Id aliquip nostrud in elit qui. Sit sint do eu elit voluptate reprehenderit est aliquip irure deserunt tempor anim culpa. Dolore sit ex anim tempor tempor occaecat exercitation excepteur.\n\nElit quis commodo et sunt deserunt voluptate consequat dolor eiusmod ipsum pariatur cillum ut. Culpa magna ea dolor eu ea do proident Lorem laborum. Non proident elit veniam ullamco qui et aute. Voluptate tempor laboris ut laboris esse exercitation quis et minim magna id dolore nulla. Do culpa laborum et fugiat irure ea ut minim.\n\nCillum commodo proident mollit sint. Minim commodo do commodo est laborum consequat reprehenderit. Voluptate minim labore sit magna mollit magna quis laborum. In sit quis irure sit ex est. Nulla mollit do cupidatat proident ex cillum irure elit ipsum sit sit qui voluptate. Reprehenderit non do qui culpa nostrud non eu non. Voluptate nulla consectetur duis cillum irure cupidatat eiusmod ipsum nisi quis ut eu enim.\n\nAute exercitation excepteur in excepteur et pariatur minim. Culpa ut cupidatat aliqua ea consectetur consectetur laborum esse labore Lorem laborum ut. Mollit laborum nisi deserunt fugiat sunt esse. Minim velit pariatur ea cillum anim voluptate cupidatat consequat labore voluptate voluptate proident tempor.\n\nAnim est sit incididunt laboris officia et ullamco nisi fugiat nostrud Lorem aliqua do. Esse anim cillum occaecat reprehenderit esse eiusmod est sunt sit et sunt non ex. Dolor tempor veniam eiusmod fugiat fugiat esse quis exercitation aute exercitation excepteur. Culpa ut voluptate eu ea aliquip nulla incididunt duis mollit sit sunt incididunt aute.</p><p>Laboris deserunt aliquip aute do fugiat officia eiusmod sint officia sunt irure voluptate excepteur do. Deserunt qui est laborum quis velit adipisicing id anim consequat aliqua. Lorem duis id elit ut nulla cillum minim cillum reprehenderit.\n\nSit nulla minim tempor qui ut in officia dolor duis reprehenderit. Esse laboris nostrud aliquip aliqua anim fugiat exercitation commodo. Est occaecat elit eiusmod enim.\n\nNostrud reprehenderit irure mollit est cillum ea qui tempor velit duis consequat quis in. Sint reprehenderit sint sit ut dolore id quis adipisicing sunt dolor do id ea ut. Est irure ut ipsum deserunt velit magna commodo nulla labore reprehenderit reprehenderit. Sunt voluptate non eiusmod excepteur culpa cillum consequat dolor est. Eu id exercitation mollit occaecat nostrud elit quis laboris ipsum cupidatat. Consequat anim occaecat ex aute laboris incididunt.\n\nMagna sit consectetur velit Lorem aliqua aliqua aliqua. Excepteur mollit exercitation id minim. Ipsum est officia excepteur cillum nisi. Voluptate cillum adipisicing veniam eiusmod id aliquip veniam id labore id labore. Sunt cillum esse ipsum ex ea veniam.\n\nAliquip anim exercitation laboris quis sint. In sit aliquip reprehenderit elit irure. Sit excepteur Lorem dolor amet commodo pariatur. Ea sunt aliqua reprehenderit eiusmod incididunt ea do irure non exercitation fugiat non.</p>",
    summary:
      "Duis commodo minim elit ullamco dolor sint mollit. Nostrud eiusmod sit ut occaecat magna irure est. Lorem qui nostrud consectetur cillum ut nisi minim. Irure enim esse labore in culpa esse aute occaecat reprehenderit proident fugiat occaecat incididunt. Fugiat dolore enim cupidatat nulla veniam magna velit.",
    docNumber: "8 7 3(g)",
    docType: "policy notice",
    title: "est ut magna minim adipisicing occaecat"
  },
  {
    office: {
      title: "Office of tempor mollit",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Mon May 15 2017 12:42:31 GMT+0000 (UTC)",
        effectiveDate: "Wed Dec 27 2006 16:46:19 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Thu Mar 02 2017 05:28:55 GMT+0000 (UTC)",
        effectiveDate: "Fri Jul 22 2011 15:07:20 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sun May 07 2017 13:29:07 GMT+0000 (UTC)",
        effectiveDate: "Thu Aug 20 2009 23:57:22 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["CDC"],
    body:
      "<p>Cillum et duis esse velit aliquip exercitation. Laborum ipsum elit velit magna aliqua aliqua labore. Officia amet qui duis adipisicing aliqua quis exercitation non sint laborum elit. Amet cupidatat veniam ex proident laboris ut eu velit veniam aute amet ex. Veniam id sint ad dolore ea non occaecat.</p><p>Eiusmod officia duis aliqua minim et eiusmod in nulla in. Ut elit esse tempor proident nostrud velit elit consequat ea ipsum. Nostrud nisi dolore Lorem irure sunt reprehenderit elit fugiat in aliquip Lorem ea aliqua. Nisi veniam minim pariatur aute est ut eiusmod. Sint Lorem culpa sit amet deserunt nostrud eiusmod elit magna incididunt amet. Amet aliquip velit irure fugiat et proident irure ex.\n\nOccaecat aliquip dolor anim aliquip amet excepteur deserunt. Laborum veniam amet cupidatat qui dolor. Ut est cupidatat minim non aliquip tempor qui. Enim anim esse incididunt pariatur qui commodo in minim adipisicing nostrud sit consequat eiusmod proident. Ex consequat esse nisi veniam culpa nisi sit id sint ut. Culpa do labore laborum qui proident ut laboris est aliqua Lorem velit mollit.\n\nElit eiusmod reprehenderit magna do non incididunt pariatur incididunt aliquip ut voluptate cillum. Pariatur ad cillum pariatur cillum adipisicing do fugiat nostrud adipisicing non duis. Ipsum duis laboris quis amet pariatur amet est aute et tempor. Do adipisicing labore consequat qui dolore minim excepteur anim ea veniam eu aliqua duis. Sit sunt occaecat est nostrud aute cillum excepteur et fugiat aute aliquip sunt est. Fugiat mollit minim Lorem tempor do in exercitation ex. Est duis aliqua qui non.</p><p>Nisi tempor adipisicing ullamco non nostrud aliqua commodo. Ullamco culpa laboris eiusmod ut sit aliquip minim anim aliquip quis quis aliqua. Pariatur occaecat ea consequat officia magna laborum in aliquip occaecat nostrud quis aliquip deserunt cillum. Lorem sunt eiusmod ipsum minim consectetur sit voluptate sunt aliquip aliqua laboris.\n\nExcepteur occaecat pariatur minim sit nostrud eu do consequat qui voluptate cupidatat pariatur. Eiusmod nostrud voluptate irure voluptate. Excepteur commodo consectetur laborum velit cupidatat fugiat officia aliquip. Id fugiat sunt ipsum nostrud pariatur cillum laboris non quis anim pariatur dolor exercitation tempor. Cupidatat minim proident do minim tempor voluptate commodo. Laboris magna ullamco cillum et. Nulla culpa magna sint proident culpa nisi pariatur commodo nulla labore amet nulla.\n\nAdipisicing sunt ipsum ad aliqua veniam sint deserunt adipisicing cillum adipisicing ea amet eiusmod quis. Dolore qui cillum aute nulla proident Lorem quis. Adipisicing consequat eu aliqua nostrud incididunt et enim aliqua ut tempor sunt consectetur. Id irure pariatur ex officia aliqua. Id reprehenderit in magna sint dolor voluptate. Consequat dolor duis duis id dolor.\n\nVoluptate occaecat aute amet ut adipisicing voluptate Lorem laborum sunt. Proident ea amet aliquip eu labore et labore eu non eiusmod qui commodo amet. Quis aliqua eu ut mollit aliqua proident irure culpa qui. Voluptate fugiat occaecat aute in reprehenderit ut voluptate et duis laborum id veniam magna. Nisi culpa magna nostrud tempor labore consequat consectetur laborum dolor.\n\nDeserunt in ipsum mollit nulla et excepteur deserunt fugiat. Aute nulla est veniam cillum. Laborum ex proident adipisicing dolor quis nulla deserunt culpa qui qui cupidatat adipisicing velit. Aliqua exercitation et ex in aliqua minim. Nulla cillum excepteur laboris culpa. Reprehenderit nostrud Lorem minim anim. Do esse dolor aliquip Lorem ut eiusmod.</p><p>Aliqua velit veniam sunt nostrud ut ad pariatur consequat dolor amet. Consectetur veniam elit esse tempor laborum pariatur incididunt aute reprehenderit consectetur aute. Ullamco irure anim sunt aute commodo ipsum laborum consectetur ipsum eu adipisicing incididunt. Ipsum et deserunt ipsum dolore eiusmod consequat velit. Fugiat ad adipisicing enim laboris aliqua sit. Ut et excepteur occaecat tempor aliquip quis est tempor mollit commodo enim ut incididunt sint.\n\nAmet officia dolor excepteur consectetur anim ut ad duis ea occaecat in deserunt. Fugiat culpa officia dolore veniam sit fugiat adipisicing culpa anim adipisicing adipisicing eu. Commodo Lorem voluptate adipisicing Lorem officia commodo culpa excepteur dolore duis sit in enim duis.\n\nMinim officia sint consectetur consequat consectetur eiusmod mollit veniam ullamco quis. Ut et ullamco aliquip sunt tempor. Id duis consequat ipsum ad laborum. Laborum est id non nostrud elit ut in occaecat ullamco nostrud. Deserunt consectetur occaecat voluptate non sit enim.\n\nIn dolor excepteur laborum ut reprehenderit magna ut sint voluptate ad minim. Ad et cillum ea dolor. Adipisicing id qui nulla mollit enim dolore adipisicing aliquip ex cupidatat labore.\n\nCulpa pariatur commodo est proident qui magna fugiat occaecat officia. Sunt aute adipisicing excepteur anim consequat ipsum fugiat aliqua sint dolor irure culpa. Exercitation anim anim et laborum id proident excepteur esse ad occaecat occaecat et. Culpa qui sint ut excepteur nostrud do duis cupidatat. Occaecat nostrud nulla nisi eiusmod. Occaecat ut adipisicing ut ut est.</p>",
    summary:
      "Ut amet ut esse exercitation et Lorem aliquip proident et ut anim officia voluptate id. Labore est commodo aliquip aliqua sint non aute aute consequat aute labore labore esse velit. Non fugiat anim Lorem sunt aliqua laboris cupidatat. Id velit ut ut do ullamco in excepteur cillum nostrud cillum nulla consequat sunt. Eu non ut laborum eiusmod irure sit cupidatat aliqua ut ad dolore aliqua. Eu proident veniam ex ullamco velit nisi veniam minim. Eu id ipsum ex elit quis pariatur et ea irure minim esse ea.",
    docNumber: "30 24 3(g)",
    docType: "sop",
    title: "occaecat anim sit cupidatat consectetur cillum"
  },
  {
    office: {
      title: "Office of tempor consectetur",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Fri Mar 03 2017 22:57:15 GMT+0000 (UTC)",
        effectiveDate: "Sun May 19 2013 11:37:34 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Fri Jul 21 2017 11:17:19 GMT+0000 (UTC)",
        effectiveDate: "Tue May 06 2003 02:01:55 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sun Feb 12 2017 12:01:23 GMT+0000 (UTC)",
        effectiveDate: "Fri Apr 12 2002 00:17:00 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["8(a)", "7(a)"],
    body:
      "<p>Velit dolor sunt labore dolor dolore eiusmod ipsum aliqua pariatur irure ut incididunt. Enim sit ullamco pariatur commodo enim. Deserunt irure dolor laborum eiusmod nulla duis duis. Magna anim ad laborum ea nisi pariatur tempor culpa minim nostrud id voluptate mollit. Dolor ad laboris deserunt ipsum cupidatat ullamco Lorem dolore laboris occaecat aliqua. Ut dolor officia minim excepteur et magna id sunt qui magna non in.</p><p>Lorem occaecat commodo laboris elit eu ex nulla eu ut eiusmod ullamco do occaecat. Consequat culpa veniam velit dolor excepteur in veniam. Aliquip sit consequat tempor magna et voluptate. Consectetur eiusmod veniam cillum laborum nostrud sunt ut excepteur. Do pariatur et duis culpa.\n\nUllamco proident sit reprehenderit cillum id sunt esse magna consectetur eiusmod excepteur. Occaecat sint deserunt cillum excepteur consequat laborum pariatur aliquip adipisicing voluptate Lorem. Sit veniam sit nisi amet consectetur culpa in aliqua est ea tempor. Fugiat proident consequat do id exercitation id id commodo quis esse enim. Labore occaecat dolore anim reprehenderit proident ad est et. Culpa dolor nostrud exercitation ullamco quis. Id incididunt commodo sint culpa.\n\nAmet non duis ut ex consectetur do eiusmod incididunt reprehenderit minim. Amet reprehenderit fugiat tempor incididunt ex irure officia voluptate magna consectetur velit. Velit ipsum pariatur aliquip ipsum quis aliquip adipisicing dolor consectetur Lorem nisi ullamco magna. Voluptate exercitation eiusmod ex ea ad ea cupidatat quis laboris minim velit adipisicing consectetur. Incididunt in anim occaecat esse sint elit cupidatat esse labore incididunt culpa ea nulla.</p><p>Adipisicing Lorem commodo cupidatat non dolor. Id labore sunt fugiat exercitation eu aute. Proident Lorem consequat elit laborum cillum proident tempor eiusmod eu voluptate adipisicing. Sunt enim adipisicing aliqua adipisicing laboris elit excepteur excepteur. Ea consequat culpa enim nulla velit ut ea Lorem sint irure dolor anim qui ipsum.\n\nEt sunt elit excepteur ipsum non magna Lorem occaecat ut deserunt adipisicing ipsum. Est adipisicing esse et est. Aliqua sint mollit aliquip eu anim. Consequat incididunt ut tempor laboris quis dolore.\n\nCommodo Lorem voluptate esse est amet est. Lorem minim Lorem aliqua sunt nulla eiusmod pariatur veniam proident in tempor. Eu ipsum aliquip est sunt esse aliquip. Enim commodo irure reprehenderit et anim eiusmod laborum minim. Et pariatur eu culpa sit labore dolor magna deserunt.\n\nEt cupidatat mollit ipsum sint. Sunt consequat qui consectetur minim aute enim voluptate reprehenderit laborum. Deserunt reprehenderit laboris ad in quis occaecat sint anim. Commodo duis est labore anim amet ex est officia ipsum sunt anim officia. Occaecat voluptate quis ad ex exercitation aliquip incididunt adipisicing magna.\n\nExcepteur aliquip labore esse sint excepteur mollit aute duis exercitation. Velit amet dolore non sunt cupidatat incididunt sint nostrud pariatur officia eiusmod sunt elit ex. Aliquip exercitation fugiat ex deserunt excepteur consequat in incididunt duis cupidatat sint occaecat duis. Tempor culpa minim commodo esse adipisicing qui exercitation commodo eiusmod qui laboris consectetur commodo.</p><p>Ipsum qui sunt elit aute consequat. Anim incididunt aliqua officia sint occaecat tempor enim id exercitation esse voluptate incididunt. Incididunt reprehenderit qui elit irure cillum cillum minim ut ipsum.\n\nCillum duis nulla eu sunt ex enim minim sint ipsum exercitation in. Irure occaecat dolor aute do labore nisi et sint laboris minim nostrud fugiat et mollit. Excepteur laboris ad voluptate aliquip proident occaecat.\n\nConsequat et exercitation mollit eiusmod magna labore nulla labore culpa. Quis anim nostrud nisi anim. In ad velit laboris tempor consequat incididunt reprehenderit labore consequat commodo sint eiusmod aliqua irure.\n\nOccaecat ut deserunt labore duis magna Lorem nostrud. Anim consequat voluptate cillum laborum aliqua ea consequat consectetur veniam. Commodo ipsum magna aute aliquip in cupidatat adipisicing.\n\nEu mollit esse veniam enim commodo nulla in officia eiusmod qui dolor officia consequat. Consequat aute id voluptate id irure dolor culpa reprehenderit in et mollit. Commodo fugiat Lorem et laborum magna sit occaecat Lorem reprehenderit esse qui culpa. Sit elit laboris velit reprehenderit culpa Lorem adipisicing consequat ipsum mollit enim esse do.</p>",
    summary:
      "Non esse ipsum magna esse nisi proident nostrud ipsum ullamco quis ipsum ut adipisicing incididunt. Ad aliquip anim aliquip commodo ad nostrud nostrud id nisi elit aliqua consectetur id anim. Fugiat non id minim culpa reprehenderit sunt ullamco dolor dolore. Cillum amet occaecat fugiat eu culpa pariatur consectetur eiusmod velit ea enim in est cupidatat. Cupidatat non culpa sint officia ea enim aliqua in enim mollit sunt.",
    docNumber: "38 47 8(g)",
    docType: "sop",
    title: "proident exercitation culpa fugiat labore sunt"
  },
  {
    office: {
      title: "Office of cillum ad",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Thu Jan 19 2017 05:09:53 GMT+0000 (UTC)",
        effectiveDate: "Sat Nov 12 2016 01:54:10 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Tue Feb 14 2017 05:28:42 GMT+0000 (UTC)",
        effectiveDate: "Mon Apr 12 2010 07:41:06 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Tue Jun 13 2017 13:31:07 GMT+0000 (UTC)",
        effectiveDate: "Sun Jun 25 2006 03:03:00 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["501(c)"],
    body:
      "<p>Officia incididunt ut cupidatat duis. In officia eu commodo do. Amet minim amet cupidatat in dolor mollit reprehenderit reprehenderit laboris quis commodo sit est aute. Ex ad sint consequat veniam. Qui in voluptate excepteur cupidatat qui in sunt nisi laboris excepteur ex. Nisi in non ad sit non ullamco laborum minim culpa.</p><p>Laboris id eu enim exercitation fugiat veniam sint duis duis aute cupidatat. Mollit sit minim duis sit consectetur aliqua laborum occaecat id. Proident irure incididunt tempor id id mollit nulla. Ad in eu sunt sunt minim reprehenderit ea ipsum reprehenderit irure dolor consequat consectetur.\n\nFugiat nulla sunt in dolore consectetur tempor cillum ea velit enim cillum velit. Sunt laboris ut incididunt magna aliquip irure. Mollit esse sint non culpa veniam quis et pariatur nulla dolor. Consectetur pariatur amet cupidatat velit consequat sint deserunt culpa nisi pariatur. Eu do excepteur esse ullamco sunt laboris ipsum est esse. Laborum voluptate aute voluptate eu aute esse reprehenderit nostrud et ut aliquip eiusmod velit.\n\nExercitation ipsum eu nostrud nulla proident est Lorem. Deserunt nisi adipisicing ipsum deserunt excepteur ad. Adipisicing veniam magna excepteur elit velit duis sint nisi mollit consequat esse labore ex magna.</p><p>Consectetur sit occaecat pariatur velit ut nostrud quis et laborum pariatur aute reprehenderit. Anim eu in magna eiusmod deserunt adipisicing reprehenderit non in ut. Adipisicing veniam anim ut id excepteur nostrud sunt esse non ex. Excepteur aliquip eiusmod mollit ex ex consectetur. Cupidatat duis tempor veniam eiusmod esse ipsum reprehenderit proident elit excepteur irure exercitation culpa. Amet dolor proident sint consequat.\n\nVoluptate labore in elit commodo adipisicing cillum do veniam minim veniam. Consequat pariatur eiusmod duis minim ex incididunt mollit incididunt eiusmod do. Aliquip quis consequat ea veniam laborum officia tempor officia tempor. Exercitation et qui consequat irure ex tempor. Est eiusmod quis dolore velit quis incididunt dolore adipisicing laborum labore velit anim.\n\nLorem voluptate adipisicing commodo aliquip ex ut sint exercitation duis esse minim. Consectetur aliquip incididunt laborum eiusmod exercitation reprehenderit do cillum aliqua eu sunt duis. Veniam ex tempor magna est velit sunt proident consequat minim proident exercitation et excepteur. Sint non veniam ea voluptate laborum.\n\nDo veniam commodo irure nostrud tempor amet ad ad voluptate incididunt sint adipisicing enim. Magna eiusmod officia aute et enim elit non in tempor dolore pariatur consectetur. Sunt mollit amet sunt ad qui et ad dolore dolore est est ea. Fugiat Lorem id quis minim dolore.\n\nMollit anim est irure incididunt in eu et nisi. Veniam elit Lorem laborum velit minim velit reprehenderit deserunt enim. Anim ut tempor cillum et adipisicing. Ad magna incididunt qui anim non adipisicing id esse culpa laborum. Occaecat exercitation enim nisi qui consectetur amet sit veniam duis commodo nulla tempor magna ullamco.</p><p>Laborum mollit adipisicing adipisicing in exercitation labore proident in est esse commodo. Sint pariatur ullamco irure Lorem duis aliqua veniam dolore laborum. Fugiat veniam magna velit exercitation ex mollit.\n\nSint officia enim eiusmod proident consequat sunt eu. Ad eiusmod nulla in minim ad dolor enim mollit sunt voluptate sunt veniam. Ut amet enim ullamco commodo.\n\nCillum occaecat pariatur culpa laboris. Enim laboris culpa dolore minim officia ullamco sint sit velit pariatur ex amet nostrud et. Consequat in ad adipisicing sint.\n\nNulla exercitation qui sunt voluptate nulla amet. Excepteur nostrud reprehenderit id cillum nulla fugiat laboris aliquip. Mollit elit sit mollit cupidatat pariatur in labore cupidatat. Adipisicing proident aute Lorem voluptate minim do tempor elit eu amet. Enim reprehenderit nostrud ea proident consequat culpa ad do aliquip enim elit magna proident labore. Officia excepteur ad in ullamco officia ea ipsum consectetur id. Exercitation veniam sint laboris nulla do irure incididunt minim sit non irure.\n\nMollit proident sit duis culpa cupidatat commodo id cupidatat occaecat officia. Qui eiusmod consectetur proident labore nulla ex nisi. Pariatur est ut ea anim deserunt ullamco voluptate culpa eu. Sint laborum aliqua dolore deserunt in eiusmod est deserunt. Pariatur eu esse exercitation in nisi incididunt laborum magna culpa id ad esse cupidatat.</p>",
    summary:
      "Aliquip aliquip magna quis duis laboris excepteur excepteur nulla ex. Minim veniam veniam et elit excepteur excepteur. Ullamco pariatur Lorem nisi dolore laboris nisi id non velit. Esse voluptate dolore consectetur adipisicing. Enim non sunt proident ad sint veniam.",
    docNumber: "12 32 7(g)",
    docType: "form",
    title: "id proident nostrud exercitation eiusmod adipisicing"
  },
  {
    office: {
      title: "Office of est labore",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sun Jul 16 2017 11:18:13 GMT+0000 (UTC)",
        effectiveDate: "Tue Apr 10 2007 01:15:36 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sun Mar 19 2017 21:37:20 GMT+0000 (UTC)",
        effectiveDate: "Sat Mar 21 2009 06:11:34 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Wed Jun 07 2017 11:30:34 GMT+0000 (UTC)",
        effectiveDate: "Tue Jul 21 2009 18:23:42 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["8(a)", "7(a)", "CDC"],
    body:
      "<p>Et do quis dolor eu aute. Eu mollit et sit elit fugiat eu cupidatat minim. Culpa ex voluptate culpa proident est nulla labore eiusmod sunt. Et in duis labore eu adipisicing labore ullamco non voluptate. Labore ut consectetur esse fugiat laboris excepteur dolor anim sint. Laborum ex eu aliquip esse ea eiusmod ullamco enim laborum cillum adipisicing. Laboris Lorem commodo in voluptate nisi pariatur elit amet exercitation pariatur Lorem tempor anim ad.</p><p>Tempor Lorem adipisicing cupidatat adipisicing ut culpa. Incididunt velit laboris pariatur dolore adipisicing qui laboris aute officia nulla ex labore. Quis Lorem eiusmod qui cupidatat sint nulla. Anim ex deserunt quis veniam elit.\n\nQuis irure elit nulla nulla excepteur anim aute nisi cillum commodo sit exercitation. Id ipsum id ut commodo. Ex sit pariatur ea ullamco id ut voluptate laboris cupidatat occaecat quis. Aute adipisicing dolor est adipisicing excepteur aute veniam Lorem eu ullamco. Qui cupidatat non eiusmod non nisi. Sit Lorem fugiat ullamco aliquip commodo enim excepteur sit adipisicing dolor nisi culpa.\n\nAdipisicing adipisicing voluptate velit laborum officia laboris aliquip dolore officia proident. Voluptate laborum elit ex dolor consequat ut enim ullamco laborum. Ad occaecat ea consectetur id ad eiusmod. Ipsum mollit mollit ullamco non tempor veniam ad. Laboris ad excepteur do cupidatat adipisicing enim occaecat. Commodo cupidatat pariatur elit minim et cillum qui labore amet.</p><p>Et laboris et sit laboris. Anim aute sit duis ad mollit dolore adipisicing dolor sit ut do non anim. Veniam dolor in sint consequat amet elit in tempor aliquip.\n\nAute culpa ad nostrud pariatur cillum veniam consectetur. Nulla tempor pariatur ad proident. Enim excepteur tempor excepteur amet sint ullamco est velit ipsum nulla non nulla. In pariatur elit voluptate eiusmod ipsum velit aute Lorem adipisicing. Aliqua incididunt cupidatat aliquip anim et ex sint fugiat sunt. Duis tempor culpa aliquip id cupidatat ea velit laborum non incididunt ipsum consectetur.\n\nQuis pariatur non nulla officia tempor dolore eu sit cupidatat Lorem officia aute ad aliqua. Aliqua aliqua in consequat culpa excepteur veniam est. Pariatur sunt do id est ipsum pariatur culpa in ullamco duis fugiat cupidatat.\n\nEx aute nostrud irure enim reprehenderit amet reprehenderit excepteur cupidatat esse commodo. Eiusmod non mollit exercitation pariatur ad. Proident eiusmod sunt quis adipisicing sint velit id proident esse veniam. Nisi consectetur aute occaecat ullamco eiusmod labore aute ipsum nostrud laborum. Incididunt culpa sunt tempor dolor irure cillum excepteur qui sit nisi. Et sint id et incididunt exercitation.\n\nMagna cillum tempor ex laboris dolor nostrud sit veniam sint voluptate duis labore deserunt. Ut dolor pariatur occaecat ex Lorem elit amet laboris irure. Incididunt cupidatat qui minim incididunt laboris. Quis ipsum aute magna anim aliquip eu ipsum sunt adipisicing aute non. Irure anim aliqua quis nisi qui eiusmod anim aute officia cillum. Magna occaecat do nisi esse quis et do velit dolor ad sunt cupidatat excepteur ad.</p><p>Aute labore dolore incididunt tempor dolore enim aliqua reprehenderit voluptate proident reprehenderit ex sunt. Ad Lorem est ex aliquip ipsum proident consectetur sunt. Lorem duis excepteur ex laborum laborum adipisicing non labore laborum. Aute ullamco ut dolor commodo aliquip nostrud dolore proident ex sunt culpa.\n\nDo ex excepteur excepteur cupidatat excepteur enim aliqua dolor sunt dolor. Aliqua nisi nostrud est laboris Lorem exercitation sit deserunt sint ipsum exercitation. Nulla commodo proident dolor deserunt excepteur fugiat adipisicing laboris ullamco incididunt quis. Laboris exercitation dolore est reprehenderit in duis. Pariatur in tempor nisi commodo incididunt dolor excepteur.\n\nCulpa occaecat proident ipsum ullamco tempor in duis sunt dolor eu adipisicing labore proident consequat. Culpa adipisicing minim nisi quis. Consectetur minim minim nisi cupidatat labore occaecat consectetur laborum in sit nulla. Ad non elit Lorem minim velit proident deserunt. Sint occaecat eu irure culpa reprehenderit.\n\nIrure pariatur eiusmod culpa sint laboris do nisi enim do. Ea proident enim voluptate labore sit labore sint veniam sunt aliqua ut velit. Irure Lorem dolor ipsum proident ad cupidatat id aliquip aliqua labore velit dolore excepteur et. Culpa culpa eiusmod et laborum aliqua eiusmod qui commodo aliqua consectetur esse et. Consectetur labore dolor Lorem nostrud anim. Veniam aute in consectetur et quis anim. Aliquip eiusmod amet ex dolore excepteur ad exercitation cupidatat esse sit irure ex excepteur.\n\nLaboris dolore duis consectetur velit incididunt cillum sit aliquip fugiat. Aliqua commodo aliquip ad magna dolor ad adipisicing veniam est. Proident excepteur amet adipisicing aute officia exercitation deserunt ad occaecat mollit officia laboris ex nostrud. Consectetur labore officia ullamco dolor Lorem laborum. Commodo incididunt excepteur nostrud nulla pariatur sint.</p>",
    summary:
      "Lorem excepteur aute enim sit officia. Est non veniam Lorem mollit anim minim laboris fugiat quis eiusmod. Reprehenderit adipisicing elit cupidatat culpa laborum excepteur veniam fugiat. Excepteur dolor eiusmod aliqua incididunt dolor sit excepteur veniam excepteur eu.",
    docNumber: "23 44 9(g)",
    docType: "sop",
    title: "anim fugiat enim adipisicing officia duis"
  },
  {
    office: {
      title: "Office of veniam excepteur",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Tue Mar 21 2017 19:15:12 GMT+0000 (UTC)",
        effectiveDate: "Mon Feb 27 2012 18:23:24 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Fri Jul 21 2017 23:54:23 GMT+0000 (UTC)",
        effectiveDate: "Thu Mar 30 2017 22:01:20 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Tue Jul 18 2017 17:32:39 GMT+0000 (UTC)",
        effectiveDate: "Tue Jan 14 2014 00:32:48 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["CDC"],
    body:
      "<p>Id exercitation sit eu officia minim anim aliqua consequat. Nulla laboris cillum occaecat eiusmod ex tempor dolor quis quis. Fugiat ut deserunt nostrud id esse occaecat dolore pariatur aliquip mollit id elit nulla do. Cillum laboris laborum commodo adipisicing nulla eiusmod.</p><p>Nisi ea nostrud pariatur fugiat elit id irure dolor. Culpa ex do proident et laborum cupidatat ad mollit consectetur duis magna. Sunt eiusmod qui laborum voluptate magna ad ex labore aliquip ipsum consectetur. Ullamco quis consectetur adipisicing amet veniam in qui. Nostrud non qui Lorem laborum. Amet nulla culpa occaecat consequat Lorem ipsum mollit laboris consequat aliqua excepteur irure nulla nisi. Magna et ut anim laborum ipsum adipisicing et cupidatat enim ullamco.\n\nCommodo ut est sunt pariatur mollit dolor nulla commodo eiusmod. Excepteur sunt sint duis quis consectetur. Irure adipisicing labore ad sunt duis nulla dolor elit. Ex irure magna cupidatat anim nulla ad sunt aliqua duis veniam.\n\nEst officia duis excepteur eiusmod velit eu consequat commodo elit anim officia. Tempor ut consectetur proident eiusmod consectetur. Et ut ex occaecat eiusmod id.</p><p>Dolore qui est est nisi officia nostrud exercitation enim est. Amet eiusmod mollit voluptate ullamco ex excepteur. Aute non in magna ipsum reprehenderit laborum. Duis quis voluptate magna reprehenderit in do duis ullamco consectetur commodo enim officia laborum sint. Sint voluptate velit ea minim minim ipsum mollit tempor veniam et.\n\nDolore veniam id labore Lorem aliqua do duis incididunt fugiat. Do velit elit consequat nulla do minim quis mollit enim nostrud eiusmod ut. Sint pariatur minim do aliqua do veniam. Quis elit mollit deserunt tempor fugiat. Fugiat eu consectetur officia occaecat veniam. Quis dolor et anim qui proident ex et nulla aute fugiat laborum. Eu reprehenderit qui qui reprehenderit pariatur magna consectetur ipsum quis enim.\n\nExercitation sit esse consequat nulla mollit minim qui aliquip culpa. Cillum consectetur magna ipsum voluptate mollit elit officia magna laboris officia in consectetur. Et labore ullamco velit eiusmod eiusmod ut adipisicing laboris. Ad laborum dolore proident dolor et aliqua sit. Commodo reprehenderit consequat pariatur do eiusmod dolore laborum ut ea sint est sit.\n\nIncididunt reprehenderit ut aute enim consequat mollit culpa labore est Lorem esse aliquip fugiat. Elit exercitation ex amet nulla deserunt reprehenderit cillum ipsum cillum exercitation qui. Elit ipsum mollit eu deserunt sit Lorem tempor.\n\nNon nulla do dolore consequat exercitation est labore laborum. Amet ut ut cupidatat officia in proident Lorem duis. Duis culpa occaecat proident amet exercitation exercitation ad et eu excepteur.</p><p>Cupidatat ad non consectetur esse sint aute. Fugiat aliqua aliquip consequat Lorem ullamco ex ea in occaecat non eu. Culpa nostrud ipsum irure do irure et. Mollit et exercitation quis anim commodo laborum duis. Esse incididunt velit dolor in.\n\nDolor est eiusmod dolor esse laboris velit officia id eiusmod anim fugiat sit sint irure. Ea velit anim deserunt do magna non deserunt aute adipisicing deserunt. Do officia do in cillum. Incididunt nisi veniam anim duis ullamco incididunt veniam nulla exercitation pariatur laborum. Qui nulla nisi ad ut ex deserunt consectetur est reprehenderit tempor ea. Nulla enim duis ut duis exercitation est eiusmod consectetur eu Lorem. Anim sunt id ea ipsum aliquip.\n\nIrure velit amet duis sunt laborum quis labore sint commodo et deserunt velit. Reprehenderit et excepteur consequat anim sunt minim laboris fugiat et nulla pariatur enim ut do. Consectetur incididunt laboris laboris dolor ex nostrud ea Lorem deserunt officia qui irure. Dolore nisi sit eu laborum incididunt quis Lorem esse minim cillum dolor do officia elit. Sunt eu nisi commodo do labore veniam cupidatat ut veniam aliqua elit. Veniam mollit occaecat nostrud officia Lorem dolore.\n\nCupidatat in et cupidatat sit elit sit velit. Cillum nisi quis enim aliqua exercitation laboris elit. Laborum velit ipsum nulla fugiat amet aute dolore sunt nisi labore officia et proident. Enim et dolore ut ipsum reprehenderit ea excepteur ullamco deserunt aliqua laborum et elit dolor. Officia deserunt qui veniam voluptate elit labore et non ea voluptate. Amet tempor pariatur quis in proident tempor laborum sunt nisi ex anim eu.\n\nId laborum exercitation est non tempor adipisicing consectetur pariatur aliquip aute. Mollit tempor nostrud deserunt cupidatat adipisicing voluptate. In ut Lorem est est dolore do aliquip cillum consectetur in ipsum elit. Mollit et velit consectetur aliquip laborum. Laborum veniam irure consectetur id magna quis sint occaecat incididunt laboris magna qui. Consequat aute dolor mollit aliquip reprehenderit esse aliqua tempor est incididunt cupidatat aliquip nostrud. Consequat reprehenderit anim cillum nostrud magna anim deserunt aute.</p>",
    summary:
      "Ea dolore veniam dolor do deserunt sit fugiat proident commodo mollit ex aliqua. Officia excepteur aliqua anim duis labore excepteur sunt ex proident exercitation mollit voluptate duis sint. Deserunt tempor culpa reprehenderit incididunt nisi incididunt consequat. Laborum aliquip laborum culpa incididunt sit elit. Deserunt voluptate consequat consectetur nisi elit incididunt laboris pariatur dolor excepteur id sint Lorem. Eu culpa deserunt exercitation occaecat labore magna laboris tempor.",
    docNumber: "29 33 1(g)",
    docType: "form",
    title: "veniam minim cupidatat ex do irure"
  },
  {
    office: {
      title: "Office of fugiat cupidatat",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Mon Jan 02 2017 20:08:22 GMT+0000 (UTC)",
        effectiveDate: "Wed Oct 19 2005 00:14:45 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Thu Jul 13 2017 04:21:19 GMT+0000 (UTC)",
        effectiveDate: "Tue Dec 08 2015 11:42:34 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Wed Jan 18 2017 01:10:37 GMT+0000 (UTC)",
        effectiveDate: "Sun Jun 05 2016 10:45:44 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC", "CDC"],
    body:
      "<p>Amet amet enim labore laborum exercitation ut aliquip non exercitation ipsum id et velit. Amet mollit aliquip id aute aliquip dolore nostrud irure exercitation elit. Sint proident enim Lorem ea est fugiat. Minim in duis in pariatur excepteur quis duis cillum pariatur dolor exercitation eu. Adipisicing enim aliquip deserunt aliquip reprehenderit aliquip qui laboris cillum in minim. Est eiusmod eu cupidatat exercitation aliqua veniam. Incididunt qui dolore qui sit veniam exercitation cupidatat.</p><p>Minim excepteur et id eiusmod do veniam ullamco proident. Duis cupidatat veniam laborum officia magna commodo aute qui laborum Lorem ex proident et. Tempor voluptate proident culpa veniam pariatur minim cillum. Ex pariatur culpa duis nisi in ipsum non. Fugiat tempor fugiat mollit ad et consectetur dolore nulla mollit aute voluptate excepteur sunt. Magna mollit aute Lorem commodo.\n\nDolor enim adipisicing Lorem magna non consectetur est pariatur. Ad incididunt sit nisi velit cupidatat amet sit fugiat irure consequat ullamco ut. Cillum non elit nulla aute fugiat ipsum ex non aute ex. Adipisicing labore sunt consectetur aliquip aliquip reprehenderit ullamco dolore quis deserunt qui ad commodo. Do anim consectetur laborum dolore ullamco culpa. Labore ea sunt non mollit dolor voluptate et cillum ad. Proident excepteur velit nisi ut consequat aliquip ut irure aliqua velit.\n\nAliquip amet est elit irure sit ex laboris ea laboris est proident non non cillum. Id ipsum eu tempor fugiat ut cillum cupidatat. Adipisicing ut ullamco proident incididunt enim laborum magna. Nulla ea eu incididunt occaecat sunt ex est cillum ea.</p><p>Commodo elit id mollit magna incididunt labore dolor tempor id consequat deserunt. Ex ea occaecat labore sit fugiat deserunt tempor. Deserunt ipsum enim proident aliqua ad. Ipsum reprehenderit do pariatur aute ipsum incididunt commodo qui.\n\nUt anim in qui nulla in esse adipisicing. Duis do do est enim cillum. Excepteur excepteur magna ex non enim nulla cupidatat quis.\n\nAnim adipisicing mollit ex deserunt. Nostrud qui pariatur magna cillum ea veniam est nisi cupidatat excepteur eiusmod. Elit eu id ullamco reprehenderit velit do incididunt Lorem incididunt cillum incididunt culpa quis. Sit ex ea ullamco est ullamco incididunt sint aliqua tempor ex fugiat incididunt dolor reprehenderit.\n\nLabore consectetur tempor voluptate cupidatat magna eu aliqua est aliquip amet eu. Sunt laboris occaecat quis esse excepteur ullamco officia. Occaecat laborum mollit ex id elit et quis amet. Minim nulla laborum amet deserunt mollit. Do tempor culpa velit et mollit occaecat occaecat ex. Ullamco laborum minim enim veniam magna velit minim et.\n\nEt ullamco qui cillum irure magna non. Irure mollit aliquip ex tempor aute dolore eiusmod. Sunt qui consectetur consequat cupidatat. Aute ex officia elit ipsum ea sunt dolore ad sit.</p><p>Culpa consectetur eiusmod duis eu reprehenderit ipsum aliquip est anim est consequat ex adipisicing proident. Irure excepteur anim labore officia officia elit nostrud reprehenderit ad. Reprehenderit eu dolor do pariatur occaecat cillum ea occaecat ea tempor id ad aute dolore. Ea id et ea non.\n\nNostrud commodo voluptate anim do. Veniam id voluptate sint sint sint ipsum magna cillum pariatur consectetur nulla deserunt culpa. Nisi ullamco cupidatat irure consequat Lorem enim nulla. Ea sunt laborum dolore do eiusmod Lorem tempor dolor non id tempor quis laboris adipisicing.\n\nEa incididunt ad ad anim consectetur deserunt velit non anim et nisi et consequat proident. Nostrud eiusmod id qui qui dolor. Magna eu mollit esse deserunt. Mollit officia aliqua aliquip quis deserunt laborum. Sunt incididunt pariatur aliquip ad exercitation velit est nisi laboris et labore. Fugiat cillum consectetur et consectetur eu mollit ullamco nostrud proident et. Nostrud incididunt sit voluptate voluptate consectetur cillum culpa occaecat tempor.\n\nIncididunt pariatur ea excepteur sunt fugiat aliquip nostrud. Commodo ullamco aliquip incididunt incididunt commodo ea proident excepteur do aliqua dolore tempor. Pariatur sunt elit incididunt aute laborum reprehenderit non. Dolore exercitation id commodo laborum nulla labore occaecat voluptate cillum id Lorem magna. Do nostrud exercitation voluptate est proident non ut et anim deserunt.\n\nConsequat tempor sint cupidatat tempor labore magna. Pariatur ullamco cupidatat cillum et Lorem consequat. Tempor esse in do consectetur voluptate labore excepteur eu officia consectetur elit do excepteur dolor. Dolore ipsum magna deserunt ex enim. Non aliquip quis eiusmod duis. Nisi duis sunt tempor aliquip cupidatat minim nulla officia ut mollit nostrud. In non nisi ad dolor.</p>",
    summary:
      "Nulla voluptate ad tempor qui magna eiusmod eu anim consequat nulla aliqua proident velit. Eu ipsum pariatur officia laborum nostrud. Nisi amet officia elit exercitation qui consequat consectetur laboris sunt cupidatat dolore. Ut fugiat id tempor nostrud ex eiusmod. Consequat et non non laborum eu dolor eiusmod reprehenderit cupidatat quis ad cillum proident. Dolor laborum cillum quis minim cupidatat qui. Nisi nulla voluptate consectetur dolor et velit aliqua nulla labore quis.",
    docNumber: "26 49 8(g)",
    docType: "policy notice",
    title: "ea aliquip amet anim incididunt est"
  },
  {
    office: {
      title: "Office of cillum do",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Thu Apr 20 2017 15:16:38 GMT+0000 (UTC)",
        effectiveDate: "Tue Aug 12 2003 23:49:03 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Mon Apr 03 2017 16:42:07 GMT+0000 (UTC)",
        effectiveDate: "Wed Apr 23 2003 22:10:57 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Tue Apr 18 2017 09:03:33 GMT+0000 (UTC)",
        effectiveDate: "Wed Nov 27 2002 08:26:07 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["7(a)"],
    body:
      "<p>Sint ullamco adipisicing tempor officia ipsum non. Fugiat ullamco cillum nostrud dolore tempor commodo id culpa incididunt quis id sint aliquip ipsum. Quis officia et voluptate in do culpa cupidatat nulla elit.</p><p>Cupidatat quis aliquip do amet anim irure est ullamco. Amet ut ullamco labore mollit tempor tempor laborum sunt labore ullamco excepteur qui. Esse nisi nostrud dolor deserunt cupidatat culpa ullamco ad aliqua nulla laboris consequat. Aliquip labore labore laboris fugiat mollit. Ipsum velit officia Lorem sunt sunt enim in adipisicing aliqua. Et sit culpa sunt proident adipisicing veniam occaecat in consectetur nulla aute adipisicing. Amet eu tempor deserunt duis veniam.\n\nCulpa magna est consectetur nisi labore ad non ex eiusmod pariatur. Labore ullamco ad excepteur sit adipisicing voluptate velit aliquip est non ea Lorem officia duis. Voluptate ea ut ad consequat anim commodo nulla ea deserunt irure officia id.\n\nSint eu eu voluptate exercitation sunt nisi sunt sunt sit nostrud. Exercitation voluptate sunt cillum enim elit et duis duis labore commodo. Commodo nisi est adipisicing id quis nostrud dolore cillum excepteur eu amet ut adipisicing reprehenderit. Reprehenderit eu et aliquip non nulla. Dolor ullamco sunt excepteur proident quis velit commodo ut laboris minim aute.</p><p>Esse quis irure minim aute fugiat aute. Fugiat fugiat qui culpa duis veniam consectetur officia. Veniam nostrud laboris adipisicing aliqua nisi sunt occaecat. Dolor eu laboris dolore id do irure amet aute dolore. Magna dolor nostrud tempor eiusmod culpa consectetur laboris elit ut sit nisi aliquip in officia. Non ut consequat laborum ea irure Lorem excepteur ad laborum sit voluptate sint.\n\nAnim incididunt cillum ad eiusmod ex nostrud mollit laborum ullamco incididunt mollit mollit enim culpa. Et id pariatur eiusmod amet eiusmod veniam consequat. Anim deserunt ad adipisicing amet excepteur est eiusmod proident laborum aute.\n\nIrure consectetur ipsum proident qui quis anim laboris occaecat mollit id est sint. Veniam nostrud elit enim nulla est duis esse qui minim sunt magna occaecat ea. Minim et elit eu quis minim enim velit magna ipsum sit commodo reprehenderit esse excepteur. Ad Lorem reprehenderit pariatur ut in duis incididunt amet cupidatat. Enim velit et minim voluptate ex reprehenderit ut est in.\n\nCillum dolore fugiat proident cillum officia dolor ullamco dolore laborum commodo. Ea veniam veniam eiusmod aute qui cillum elit consequat proident laborum dolore. Do esse ullamco commodo proident consequat veniam. Labore incididunt in qui ipsum occaecat incididunt elit deserunt dolor dolor qui tempor eiusmod consectetur. Fugiat dolore irure dolore voluptate consectetur pariatur. Laborum tempor qui reprehenderit aute cillum aute velit veniam aute laborum exercitation pariatur. Laboris dolor mollit dolor deserunt tempor est veniam irure esse consectetur mollit ullamco.\n\nEa fugiat ipsum qui et deserunt incididunt commodo eiusmod. Aliqua amet elit laborum enim velit aute commodo eiusmod amet amet qui tempor dolore dolor. Officia ex cillum in fugiat qui ex est eu excepteur in.</p><p>Et esse anim labore amet exercitation ex aute ut. Dolor proident incididunt officia sunt. In enim dolor commodo non occaecat voluptate quis veniam reprehenderit eu occaecat adipisicing esse. Nostrud ad et consequat laborum proident pariatur sunt sint magna ullamco quis nulla labore commodo. In nisi irure nisi reprehenderit ut tempor consectetur mollit Lorem ullamco aute velit dolore consectetur. Ex amet adipisicing est magna magna duis labore sit ut et dolor exercitation consequat.\n\nIn ea occaecat ipsum duis sit laboris sint aliqua minim qui deserunt magna fugiat. Mollit amet amet veniam est laborum fugiat excepteur. Ipsum nisi sint anim duis ullamco aute adipisicing velit in minim est tempor. Dolor quis amet laboris commodo ut magna consequat ullamco eiusmod proident fugiat elit eu. Elit incididunt aliqua commodo consequat. Commodo aute aute nulla in duis excepteur velit sint.\n\nEst ex fugiat commodo in nulla aliquip et laborum laborum velit ut. Do aliqua fugiat adipisicing deserunt reprehenderit est reprehenderit nulla ullamco voluptate ad do nostrud do. Sint sint ad dolore magna ipsum ut sint consequat. Enim elit duis cillum Lorem esse veniam culpa et aliquip officia et. Esse nostrud Lorem sit aute ad deserunt veniam ad magna duis incididunt sunt labore cillum.\n\nCillum enim elit voluptate dolore dolore proident veniam elit in exercitation. Incididunt in nostrud amet aliquip aliquip ad incididunt ex ex tempor pariatur. Ut in veniam duis aliquip elit culpa est minim esse. Dolore cupidatat laboris cillum eiusmod consectetur anim qui voluptate.\n\nEiusmod fugiat ad laborum labore dolor ut culpa nulla et excepteur velit amet. Ipsum ipsum aliquip magna mollit pariatur labore tempor ea. Occaecat nisi exercitation eu voluptate ex dolore cillum voluptate sit. Laborum adipisicing consectetur incididunt sint cupidatat enim mollit cupidatat commodo.</p>",
    summary:
      "Non do ut consequat pariatur et nostrud amet culpa anim nisi deserunt dolor. Culpa incididunt ipsum amet incididunt esse est. Mollit in non eiusmod minim excepteur anim aliqua proident.",
    docNumber: "7 30 2(g)",
    docType: "form",
    title: "exercitation voluptate aliqua veniam ad laboris"
  },
  {
    office: {
      title: "Office of aliquip eu",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Thu Jan 12 2017 05:45:59 GMT+0000 (UTC)",
        effectiveDate: "Wed Jan 29 2014 19:42:27 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sun Apr 23 2017 11:56:33 GMT+0000 (UTC)",
        effectiveDate: "Mon Mar 19 2001 19:10:32 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sun May 28 2017 18:03:25 GMT+0000 (UTC)",
        effectiveDate: "Thu Apr 12 2001 16:56:55 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["8(a)"],
    body:
      "<p>Cillum occaecat sint aliqua cupidatat sunt pariatur dolore ex adipisicing duis ad cupidatat veniam. Occaecat sunt exercitation ipsum nisi est fugiat non est irure eu. Veniam ipsum enim veniam pariatur enim culpa cillum sunt. Fugiat dolor ex dolor culpa velit dolor do minim laboris commodo. Eiusmod non anim duis fugiat ad velit ipsum reprehenderit mollit excepteur ut eu laborum. Enim non eu Lorem excepteur.</p><p>In nisi laborum id est Lorem nulla occaecat dolor. Cupidatat amet dolore adipisicing labore ea adipisicing tempor. Commodo deserunt sit ipsum nisi laboris ad amet sit nulla et consequat adipisicing tempor. Tempor aute proident cupidatat adipisicing quis fugiat tempor ad. Laborum pariatur culpa duis fugiat. Laborum ipsum dolor minim laborum velit ut excepteur irure sint consequat fugiat.\n\nExercitation ipsum id qui exercitation ad. Cillum reprehenderit exercitation laboris incididunt voluptate dolore tempor excepteur irure ipsum aute. Velit elit nostrud aute sunt sunt Lorem in nisi tempor velit esse exercitation amet veniam. Proident reprehenderit velit ullamco Lorem quis consectetur magna adipisicing ut fugiat.\n\nFugiat id consectetur exercitation dolor consequat. Culpa voluptate aliquip consequat consectetur eu. Eu non dolor duis sunt. Ipsum laboris sit dolore magna esse laborum excepteur duis dolore labore est incididunt ipsum elit. Nisi pariatur aliquip proident ut qui in eiusmod tempor sint irure veniam excepteur amet consectetur.</p><p>Deserunt eu fugiat quis eiusmod. Lorem mollit irure laboris commodo occaecat nulla enim labore fugiat elit consectetur officia ut. Minim elit sint occaecat aliqua do proident cillum nostrud irure sunt. Ea excepteur ipsum nostrud esse eiusmod nulla tempor laborum cillum.\n\nAmet ullamco enim reprehenderit dolor quis ex ad. Consequat elit laboris dolore ea nostrud ad. Aliqua sint commodo tempor incididunt dolore eiusmod eu velit ad commodo excepteur cillum excepteur. Do non nostrud incididunt aliquip nostrud adipisicing esse voluptate consectetur fugiat non irure. Fugiat ipsum sint reprehenderit voluptate. Nulla et consectetur enim aute adipisicing sunt magna ad eu dolor eiusmod ullamco consectetur nulla. Fugiat fugiat proident qui sunt officia tempor fugiat eu minim sunt eiusmod sit duis.\n\nCillum irure enim consectetur anim enim eu amet qui. Ullamco voluptate esse enim elit adipisicing Lorem. Occaecat et velit culpa proident id quis consequat amet. Eu consequat tempor fugiat quis velit cillum dolor Lorem cillum dolore est consequat ut nostrud. Incididunt officia magna eu nulla exercitation consectetur labore aliquip ea. Duis dolore proident commodo qui eiusmod consequat ullamco adipisicing tempor quis sit minim id nostrud. Reprehenderit amet laboris fugiat enim cillum.\n\nElit non ut Lorem aliquip sunt commodo reprehenderit. Ex cillum eiusmod irure aute incididunt consequat non cupidatat eiusmod culpa excepteur excepteur fugiat aliquip. Ullamco quis ex ea nisi qui minim id. Cillum aliqua id commodo reprehenderit proident. Esse duis minim fugiat nostrud aute reprehenderit duis. Ipsum consequat esse qui deserunt nisi officia tempor ex nisi officia. Reprehenderit sunt mollit ut culpa nulla enim consectetur culpa est.\n\nEa do tempor deserunt eu quis esse voluptate minim veniam dolor. Lorem incididunt sunt exercitation consequat. Nisi incididunt nulla enim Lorem ut. Laboris irure velit eiusmod excepteur qui et ad incididunt tempor eiusmod non dolore veniam enim. Pariatur nisi occaecat eu sunt veniam est commodo proident. Laboris et exercitation eiusmod aute Lorem reprehenderit voluptate. Mollit ullamco officia Lorem reprehenderit aute nostrud.</p><p>Enim in exercitation velit ullamco consequat. Ut commodo laborum adipisicing excepteur laborum mollit tempor adipisicing. Nisi sunt qui amet magna ea ipsum aliquip ullamco esse Lorem. Magna adipisicing nulla ex irure in voluptate pariatur consequat. Tempor aliqua duis esse pariatur voluptate sunt Lorem cupidatat excepteur proident ad aliquip. Ad tempor esse quis enim anim esse laborum ea dolore pariatur amet. Id sit exercitation minim nulla elit quis aliqua duis nulla non.\n\nAmet do deserunt nulla exercitation fugiat est tempor. Consectetur ad esse nulla est deserunt proident non ipsum magna. Do ex nisi anim eiusmod velit eu laborum minim. Minim Lorem veniam aliquip ea mollit quis sunt dolore.\n\nSint amet nulla do est non. Fugiat amet aute in officia laborum ipsum ullamco sunt amet. Enim aliqua amet aliqua sunt mollit laboris consequat et duis occaecat sunt. Velit deserunt excepteur cupidatat irure qui laboris fugiat.\n\nSint occaecat eu cillum laborum sint. Proident irure in consequat consequat ea do occaecat. Consequat sit in dolor esse amet est ea ut veniam aute nulla. Laborum cupidatat ea voluptate non. Laborum in ullamco excepteur nulla non magna. Est consequat in amet dolore enim. Ut nisi eu velit in aliqua esse.\n\nOfficia ullamco esse et ad quis elit culpa officia reprehenderit laborum tempor. Ad eiusmod ullamco ea pariatur commodo quis. Sit amet sint sint eiusmod veniam ad mollit commodo quis. Sint nostrud sit eiusmod adipisicing quis est non occaecat fugiat anim aliqua amet in veniam. Velit exercitation Lorem eiusmod nisi velit amet culpa incididunt nulla ipsum magna Lorem. Et amet aliqua irure enim laborum culpa et exercitation laborum cupidatat ex qui reprehenderit Lorem. Duis ipsum ex veniam minim aliquip labore dolore tempor anim officia reprehenderit officia.</p>",
    summary:
      "Id ex in tempor duis duis cillum irure nulla quis et. Incididunt pariatur deserunt aliqua cupidatat minim. Exercitation consectetur velit fugiat exercitation ut exercitation pariatur amet dolore aute. Ut deserunt eiusmod velit aliqua deserunt eu consectetur. Nulla ut consequat cupidatat do aute culpa. Irure nisi enim exercitation voluptate sit nulla cillum esse veniam reprehenderit minim consequat. Do labore magna est pariatur anim cupidatat eu eu.",
    docNumber: "15 34 5(g)",
    docType: "policy notice",
    title: "enim sunt eu dolor enim sit"
  },
  {
    office: {
      title: "Office of irure eiusmod",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Mon Jun 05 2017 12:10:45 GMT+0000 (UTC)",
        effectiveDate: "Sat Sep 22 2012 05:56:12 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Mon Jan 09 2017 09:36:55 GMT+0000 (UTC)",
        effectiveDate: "Wed Nov 11 2015 02:44:05 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sat May 13 2017 17:22:21 GMT+0000 (UTC)",
        effectiveDate: "Sat Mar 23 2002 04:25:50 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["8(a)", "CDC"],
    body:
      "<p>Ad laborum eiusmod aliquip cupidatat ex ipsum nulla aute eu ad magna et. Aute mollit non fugiat dolor aliquip non cupidatat quis nisi dolore pariatur. Aute magna cillum non sunt veniam amet proident irure in non. Id officia consectetur ea est aute proident nostrud sit minim elit.</p><p>Enim officia dolore consequat proident ullamco mollit in. Deserunt velit esse id ullamco duis. Amet ut fugiat ullamco ex.\n\nDuis aliquip culpa aliqua proident dolor non Lorem labore amet magna. Veniam ea velit ullamco exercitation proident et veniam. Eiusmod cupidatat in irure reprehenderit est veniam irure duis minim amet elit nulla. Magna ea reprehenderit quis occaecat ad aliquip. Labore eu ea deserunt ex. Consectetur elit laborum nisi aliqua exercitation quis anim adipisicing culpa voluptate exercitation ad.\n\nDuis cupidatat velit consectetur fugiat est. Velit commodo ex aliquip est elit veniam aliqua laboris aute do. Esse sint incididunt aute sint reprehenderit in tempor dolore ad ex amet.</p><p>Anim do incididunt est deserunt velit aliqua est eiusmod laboris eiusmod. Velit voluptate reprehenderit voluptate fugiat adipisicing ut do pariatur. Laboris magna cupidatat adipisicing officia occaecat ullamco do veniam commodo sint nostrud esse sunt. Commodo laborum sint ad irure proident pariatur eiusmod do Lorem ad sit quis exercitation mollit. Mollit ea voluptate occaecat in laborum.\n\nCillum dolor ullamco nulla laboris duis culpa incididunt ea. Aliqua ex mollit sunt ad sit veniam quis officia laborum nulla elit veniam ullamco. Ex proident minim sunt consequat minim incididunt ullamco.\n\nIrure tempor esse sint aliqua. Do enim adipisicing velit Lorem anim aliquip sit reprehenderit anim Lorem aliquip sit ullamco aliquip. Ipsum reprehenderit laboris nostrud nulla pariatur sint enim eu nulla qui amet.\n\nSint duis laboris irure cillum tempor anim mollit. Sit est adipisicing aliqua eu nisi nostrud occaecat eu adipisicing ex adipisicing anim non. Quis eiusmod sunt elit enim sint ut esse esse est veniam ut nostrud nisi. Sunt esse fugiat cillum sint ut aliquip sunt do cillum proident ex ullamco sint. Elit proident nulla deserunt ea sit enim nulla consequat ipsum nulla adipisicing. Minim est qui exercitation laboris.\n\nNostrud anim ullamco ad proident veniam amet reprehenderit irure proident laboris Lorem. Mollit aute cupidatat reprehenderit esse elit tempor est tempor nisi ex. Est labore tempor occaecat proident ad. Quis ex non anim adipisicing non et non elit. Et dolor sint in ullamco in enim aliqua officia sunt nostrud et minim irure. Tempor est pariatur culpa enim reprehenderit tempor aliquip irure commodo.</p><p>Et nisi officia id nulla est elit proident velit proident ad cillum amet. Incididunt dolore labore consectetur magna exercitation labore. Esse exercitation laborum mollit velit nulla voluptate ea officia minim deserunt ut dolore in.\n\nTempor minim exercitation duis qui eiusmod cillum elit exercitation. Ut consectetur fugiat cupidatat sit magna labore ad et exercitation sit dolore dolor ullamco incididunt. Aliqua sunt duis et aliqua exercitation voluptate eu anim adipisicing.\n\nMollit ea eu aliquip cupidatat pariatur eiusmod cillum do reprehenderit. Deserunt tempor incididunt laboris commodo labore nostrud quis. Cupidatat ad non sit aliqua labore incididunt deserunt. Mollit incididunt ad occaecat cillum. Sint ex adipisicing incididunt velit aute ut sint dolor cillum sit laboris minim duis. Adipisicing dolor officia tempor non qui. Voluptate duis magna est id.\n\nCommodo exercitation exercitation elit nisi fugiat nisi nulla enim aute reprehenderit. Aute est aliquip veniam quis reprehenderit culpa. Exercitation eu nulla duis id exercitation officia. Ex anim tempor veniam aliqua ullamco consectetur in fugiat ut aute cupidatat. Ad in sunt deserunt sunt fugiat. Aliqua deserunt excepteur dolor aliquip id nulla aute ullamco ex enim laboris nostrud ex.\n\nAute ipsum anim aliqua mollit commodo nulla nostrud cillum ea. Mollit id ullamco elit est commodo nostrud ut Lorem dolor id. Deserunt nostrud sint qui eu.</p>",
    summary:
      "Sint ad do nisi ex id. Velit aliquip Lorem fugiat elit culpa sint veniam quis. Quis ad sit dolor dolor aliquip in. Ut eiusmod eu fugiat commodo occaecat amet. Veniam ea occaecat quis aliqua excepteur ea nulla. Consectetur est eiusmod reprehenderit do magna consequat nostrud consequat qui id tempor labore dolore enim.",
    docNumber: "39 7 9(g)",
    docType: "policy notice",
    title: "do exercitation consequat exercitation cillum sunt"
  },
  {
    office: {
      title: "Office of ad ea",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sat Jan 14 2017 02:06:37 GMT+0000 (UTC)",
        effectiveDate: "Wed Mar 13 2013 05:55:46 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Tue Jan 17 2017 14:04:19 GMT+0000 (UTC)",
        effectiveDate: "Tue Apr 25 2017 05:01:02 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sat Mar 25 2017 05:01:40 GMT+0000 (UTC)",
        effectiveDate: "Thu Dec 09 2010 12:05:32 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["CDC"],
    body:
      "<p>Ut sint anim cupidatat ex adipisicing ullamco veniam labore excepteur labore aliquip qui qui non. Amet in sunt mollit ullamco labore in minim mollit. Qui commodo magna excepteur aute nisi commodo.</p><p>Ex ea nisi cillum sint cillum proident nisi Lorem consectetur. Amet excepteur dolore laboris voluptate culpa aliqua reprehenderit anim. Consequat sint esse elit laboris irure velit pariatur do consectetur minim culpa enim Lorem. Aliqua consectetur veniam sit occaecat. Nisi elit consectetur adipisicing eu enim culpa incididunt incididunt do sint nisi deserunt. Ipsum aliquip nostrud enim non adipisicing aliqua.\n\nNon culpa minim adipisicing tempor ullamco culpa adipisicing. Deserunt incididunt exercitation ad nostrud velit exercitation minim fugiat. Duis adipisicing veniam commodo aliqua occaecat adipisicing. Deserunt irure aliquip nisi nulla sunt enim enim non aliquip ex id dolor id. Occaecat cillum ad Lorem est cupidatat ut magna veniam reprehenderit do. Occaecat quis enim deserunt exercitation aute anim eiusmod laboris consectetur.\n\nReprehenderit laboris commodo nulla mollit. Mollit elit veniam sint velit laboris officia eu exercitation culpa in ad. Excepteur culpa nulla adipisicing ullamco ut. Occaecat nostrud est dolore ipsum qui Lorem reprehenderit in. Laboris minim occaecat irure officia mollit fugiat excepteur cupidatat elit aute. Nulla incididunt officia qui nisi nulla veniam voluptate laborum laborum sunt reprehenderit. Commodo aliquip sint voluptate eu proident id veniam cillum velit excepteur occaecat.</p><p>Qui proident occaecat ad amet incididunt deserunt incididunt elit. Eiusmod ipsum ea pariatur ad id adipisicing. Consequat fugiat cillum officia officia excepteur voluptate sunt.\n\nCillum adipisicing cillum magna ad nisi occaecat proident occaecat eu incididunt voluptate. Eu minim eiusmod nulla et mollit. Non enim dolore esse mollit in mollit elit irure. Labore ut dolore anim nostrud laborum velit ipsum aute et ut.\n\nDolor exercitation excepteur quis incididunt nisi deserunt exercitation voluptate culpa anim tempor nulla excepteur. Et elit minim amet dolor cupidatat exercitation irure adipisicing Lorem qui commodo sit adipisicing. Pariatur eu et aute et. Esse aute pariatur proident ipsum nulla labore ad.\n\nMagna aliquip voluptate cupidatat occaecat ut nulla cupidatat velit mollit officia laboris. Excepteur sunt excepteur nostrud ea sunt qui sint id est occaecat fugiat nostrud cillum. Dolor ipsum elit cupidatat aliquip irure proident amet officia elit minim excepteur voluptate nostrud.\n\nNostrud duis excepteur eu eu enim deserunt cillum tempor esse dolor. Nostrud est aliqua proident exercitation consequat nostrud sint in nostrud. Proident adipisicing quis ipsum irure nulla ex. In aliquip cupidatat voluptate velit. Occaecat culpa mollit enim laboris consectetur laborum proident labore.</p><p>Dolore est excepteur ut laborum laboris et exercitation occaecat do veniam sunt excepteur voluptate culpa. Est officia tempor aliqua irure reprehenderit laboris ex nulla dolor adipisicing excepteur fugiat. Et aliquip nulla tempor culpa ipsum. Eu id aliquip consequat labore id est exercitation anim laborum laboris labore quis.\n\nUllamco sunt fugiat ea eiusmod occaecat elit anim est. Ad Lorem non ipsum dolore aute sunt ullamco dolor tempor minim. Eiusmod sint excepteur tempor consectetur ut. Consequat sit exercitation Lorem cupidatat velit aute veniam ea exercitation id ea aliqua nisi. Quis eu quis proident est quis labore quis exercitation sint Lorem. Occaecat magna laboris fugiat nostrud commodo commodo adipisicing ipsum est velit Lorem reprehenderit est.\n\nDolore labore cillum sit ut id. Incididunt ea ea duis nisi ipsum Lorem occaecat sint sit ut voluptate. Amet consequat occaecat velit dolor ullamco do. Eiusmod pariatur irure ullamco enim mollit elit ex commodo fugiat. Quis laborum labore nisi exercitation duis dolore veniam duis adipisicing qui pariatur. Est ex qui proident proident nostrud occaecat aute voluptate incididunt ex.\n\nEt eu fugiat nostrud pariatur incididunt velit in occaecat mollit aliquip id ullamco officia culpa. Quis proident fugiat culpa exercitation. Enim incididunt non ad sint fugiat minim tempor ut magna elit irure velit. Sit eu ex irure laboris dolore minim officia ullamco voluptate qui occaecat reprehenderit aliquip magna. Non nisi aliqua cupidatat nulla non.\n\nExcepteur deserunt voluptate excepteur amet duis elit minim consequat dolore elit fugiat. Lorem ut anim consequat mollit occaecat minim Lorem sunt. Do anim adipisicing duis non irure consequat proident et.</p>",
    summary:
      "Ea esse deserunt sit officia. Deserunt amet ullamco deserunt ea qui nostrud fugiat minim magna ullamco aliquip ut. Officia eiusmod dolore aliquip labore ut labore ea. Fugiat quis non cupidatat et ex. Quis sunt laboris elit ipsum adipisicing tempor. Amet elit excepteur ad id exercitation irure.",
    docNumber: "27 45 3(g)",
    docType: "form",
    title: "tempor exercitation amet exercitation duis deserunt"
  },
  {
    office: {
      title: "Office of magna ex",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sat Mar 04 2017 21:46:41 GMT+0000 (UTC)",
        effectiveDate: "Fri Apr 14 2006 15:26:27 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Wed Jun 07 2017 14:01:54 GMT+0000 (UTC)",
        effectiveDate: "Sun Aug 04 2013 15:00:42 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Tue Jul 04 2017 15:21:30 GMT+0000 (UTC)",
        effectiveDate: "Sat May 20 2006 06:52:25 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["8(a)"],
    body:
      "<p>Dolor eiusmod enim dolor occaecat et duis ipsum sit ea. Ullamco sunt veniam veniam ad et nisi ullamco aliquip aliqua eiusmod cillum aliquip. Occaecat sunt exercitation pariatur laborum anim elit sint culpa duis sint.</p><p>Ea ullamco minim ullamco Lorem quis ipsum pariatur. Proident excepteur magna cupidatat voluptate ex sint ad et reprehenderit occaecat. Consequat adipisicing sunt dolor aliqua sint ad excepteur cillum mollit. Laboris proident magna adipisicing quis adipisicing labore ad. Consectetur id enim aute aute esse nostrud voluptate esse exercitation nisi magna cupidatat et. Qui ullamco magna in nisi do ad deserunt Lorem exercitation tempor cupidatat exercitation. Dolor id consequat voluptate nulla eiusmod cupidatat et minim voluptate veniam consequat nostrud dolore.\n\nOfficia adipisicing culpa quis deserunt consequat ea sit aliqua deserunt est irure. Magna et ex est dolore aliqua incididunt tempor. Dolore ad irure amet aliquip ea velit. Quis nulla sunt do incididunt fugiat consectetur culpa.\n\nMinim ea laborum nostrud aliquip nulla sint voluptate reprehenderit esse incididunt consequat ad magna reprehenderit. Culpa incididunt velit quis reprehenderit aute ad consectetur in. Pariatur cupidatat aliqua do nostrud do fugiat aliqua ut nisi duis officia commodo excepteur dolor. Dolor et labore occaecat cillum fugiat ad officia Lorem sint velit officia sunt ullamco aliqua.</p><p>Ullamco non ex consectetur esse magna amet commodo laboris esse minim culpa nulla elit anim. Esse veniam Lorem consectetur laborum deserunt magna anim. Do sit culpa est minim mollit. Esse veniam occaecat deserunt ad cillum labore cupidatat Lorem laborum in in. Nulla sunt officia aute quis nulla eu deserunt deserunt amet eu.\n\nUt cupidatat ea occaecat ad velit non nulla esse cupidatat et veniam excepteur fugiat dolor. Elit aute laboris consectetur fugiat Lorem occaecat amet elit. Sint commodo labore anim reprehenderit labore reprehenderit consectetur incididunt sunt. Consequat veniam consequat aute magna veniam voluptate.\n\nEt excepteur aute aliqua magna. In laborum sunt laboris commodo magna labore incididunt. Fugiat occaecat aute do culpa enim. Cillum adipisicing sunt labore laborum pariatur sint nulla consequat sunt occaecat.\n\nCulpa occaecat et veniam dolor. Commodo ad proident dolor pariatur ullamco ullamco est. Dolor consectetur laboris culpa Lorem anim laboris non pariatur incididunt. Eiusmod proident minim non Lorem sit.\n\nEnim tempor nisi exercitation ex. Reprehenderit ea est enim consequat et ipsum amet sunt exercitation sint. Occaecat velit ea eiusmod cillum ex sit.</p><p>Laborum sunt mollit culpa exercitation elit laborum reprehenderit. Ipsum Lorem veniam esse laborum cupidatat in nisi. Sit aliquip elit amet elit elit est voluptate velit enim ex occaecat. Aliquip est sunt reprehenderit cupidatat enim cupidatat eiusmod ex quis velit nostrud irure.\n\nUllamco officia et pariatur enim do incididunt occaecat exercitation. Excepteur qui laborum est occaecat irure Lorem excepteur amet qui ea pariatur occaecat velit incididunt. Officia amet fugiat do voluptate tempor veniam irure nostrud tempor. Ex deserunt in esse aliquip dolore sit aliquip do exercitation. Minim esse consequat pariatur ut aliqua deserunt aliqua et esse. Eiusmod veniam et ipsum ullamco nulla ipsum veniam magna. Eu excepteur est consequat fugiat cupidatat labore sit ea tempor ipsum adipisicing.\n\nUllamco mollit sint tempor in consectetur occaecat pariatur ad ut. Excepteur magna veniam anim elit do occaecat culpa reprehenderit ipsum duis sunt velit minim ipsum. Quis magna nostrud esse commodo voluptate quis ea excepteur esse sint. Sit do qui esse culpa. Laboris dolor aliqua anim laborum. Ipsum ut magna sit et sint exercitation enim et.\n\nExercitation dolore id adipisicing officia cillum. Nostrud ut deserunt ut officia culpa pariatur minim esse pariatur nostrud laboris. Aliqua aute amet aliquip eiusmod officia. Mollit aute eiusmod nulla ex proident est deserunt qui voluptate aliquip adipisicing nisi ex officia. Laborum est laborum tempor nostrud voluptate.\n\nUt elit officia proident aliqua anim. Reprehenderit est amet sit mollit ut magna deserunt amet Lorem consequat labore aliquip anim velit. Laborum exercitation dolore sit velit. Fugiat eiusmod officia sit laboris et laborum in do veniam amet. Mollit proident officia ad officia consequat sunt. Lorem consectetur adipisicing pariatur exercitation.</p>",
    summary:
      "Id pariatur dolore reprehenderit eu proident exercitation laborum irure. Deserunt excepteur adipisicing culpa culpa id elit non excepteur consectetur adipisicing ut aute occaecat. Est culpa ut culpa cillum incididunt dolore consequat exercitation ea commodo minim officia adipisicing. Sit fugiat magna enim aute qui irure consequat consectetur enim incididunt do aliqua dolore reprehenderit. Nulla consequat cupidatat occaecat id laboris duis sit cillum aliquip sit aliqua incididunt quis.",
    docNumber: "26 3 6(g)",
    docType: "policy notice",
    title: "ea consectetur fugiat aute non nulla"
  },
  {
    office: {
      title: "Office of sint in",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Thu Jun 22 2017 05:22:39 GMT+0000 (UTC)",
        effectiveDate: "Tue Sep 13 2005 18:06:15 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sun Mar 05 2017 02:13:26 GMT+0000 (UTC)",
        effectiveDate: "Fri Jan 08 2010 09:17:49 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sun Apr 09 2017 21:24:19 GMT+0000 (UTC)",
        effectiveDate: "Mon Oct 01 2012 15:21:01 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["8(a)", "7(a)"],
    body:
      "<p>Laboris ea esse dolor nostrud sint est sint et. Esse labore sit velit eiusmod ex do tempor quis cupidatat. Adipisicing in sit et proident velit eu fugiat ex aute occaecat et nisi nisi incididunt. Dolor enim minim consectetur reprehenderit labore et est ut irure deserunt amet adipisicing.</p><p>Consequat qui voluptate labore aliquip qui. Incididunt qui enim aliquip laborum mollit nostrud enim enim irure ipsum dolore aliquip dolore. Laboris cupidatat reprehenderit et eiusmod nisi consectetur Lorem. Qui in ipsum aliquip mollit consequat.\n\nVelit anim magna aliquip dolore labore laborum ullamco in eu esse magna nisi. Irure ad dolore esse quis culpa. Ea proident eiusmod sint ea nisi deserunt labore fugiat exercitation. Eu occaecat dolor ullamco eiusmod nulla voluptate. Sit irure laborum quis deserunt minim nulla eu ullamco sint.\n\nCommodo nulla anim esse cillum minim exercitation anim minim mollit eiusmod ea excepteur ad laboris. Ad quis dolore ullamco officia esse elit in culpa laboris commodo Lorem. Cupidatat est culpa tempor culpa ut deserunt officia irure. Pariatur do qui quis nostrud cillum anim irure incididunt exercitation exercitation anim nostrud. Id minim duis commodo labore tempor elit officia fugiat. Ea labore magna incididunt id.</p><p>In reprehenderit aliquip cupidatat eiusmod deserunt dolor. Elit do incididunt ex consectetur sunt nisi reprehenderit esse ipsum voluptate laboris nisi aliquip. Duis non culpa et laboris qui do et culpa. Amet culpa mollit quis consequat.\n\nUllamco Lorem commodo sunt mollit proident eiusmod id. Dolore aliqua ipsum velit adipisicing. Do in velit officia exercitation ipsum velit duis do irure eu enim voluptate laborum. Est ullamco ullamco amet laborum ad consequat exercitation sint labore aute veniam quis sunt. Ut dolor consectetur aliqua Lorem cupidatat nostrud Lorem enim sunt aliquip velit duis aliqua laboris.\n\nIncididunt voluptate incididunt pariatur ex amet laboris quis non nisi in id. Ad dolor elit excepteur irure. Culpa reprehenderit commodo do aliqua tempor. In duis reprehenderit minim sit esse pariatur sint.\n\nIncididunt do veniam dolore sunt eiusmod ipsum reprehenderit commodo. Voluptate enim voluptate cupidatat elit commodo. Tempor laboris consequat ad quis velit nostrud laboris. Consectetur quis non veniam elit sit aliqua cillum veniam non tempor Lorem occaecat deserunt. Elit culpa exercitation laborum laboris qui sit dolor.\n\nExcepteur magna est Lorem culpa est aliquip consectetur tempor est. Ex est non sint velit pariatur minim sint voluptate fugiat reprehenderit esse voluptate labore elit. Tempor occaecat ea sint cupidatat ad fugiat sunt ea exercitation adipisicing enim culpa officia voluptate.</p><p>Enim elit laboris aute Lorem Lorem in quis nostrud consequat sint in officia. Ullamco pariatur ad ut esse. Amet ea nulla irure sint labore pariatur. Lorem non velit nostrud ex. Incididunt proident consectetur incididunt cillum et id consectetur cillum aute occaecat laborum. Laborum labore dolore et anim ad deserunt non sunt aliqua.\n\nExcepteur dolore occaecat incididunt labore cupidatat laboris enim laboris. Sint deserunt minim sunt sunt excepteur laboris ex est dolor ad et ullamco ipsum id. Anim et mollit commodo adipisicing dolor. Elit nisi adipisicing culpa sunt consectetur irure enim pariatur officia cupidatat.\n\nElit sint aliqua in aute mollit sunt reprehenderit occaecat anim voluptate laborum amet. Et mollit consectetur deserunt tempor magna exercitation et ad consequat veniam aute consequat qui adipisicing. Id et deserunt eu eu culpa et laboris laboris aliqua laborum elit.\n\nVelit dolore veniam aliqua in consequat cillum adipisicing est pariatur. Incididunt eiusmod ullamco consequat eiusmod labore magna. Non sunt anim culpa eiusmod do mollit et est exercitation enim. Et labore proident excepteur eu ipsum eu consequat culpa. Ipsum pariatur aliquip cillum adipisicing velit sit dolore. Exercitation do amet irure nulla commodo nulla excepteur magna.\n\nId esse pariatur laboris in nisi nisi aliquip esse anim tempor excepteur et. Enim aliqua Lorem aliqua esse qui nulla eu ut ut anim incididunt. Eiusmod adipisicing nisi ad esse incididunt exercitation ad ad esse. Dolore veniam incididunt laborum ea ipsum aliquip est ad ad. Nulla culpa sint nostrud laboris occaecat commodo laborum officia cillum officia ullamco officia ad. Eiusmod officia aliqua qui in incididunt et elit deserunt adipisicing laborum sit.</p>",
    summary:
      "Nulla dolore est deserunt fugiat fugiat consectetur ea Lorem minim sint eu sunt anim. Irure anim non sunt cillum excepteur sunt adipisicing non. Enim sit consequat qui cupidatat esse est et aliquip. Cillum cupidatat id laboris esse ipsum occaecat. Enim aliquip nisi quis minim veniam irure sunt minim anim culpa eiusmod nisi veniam labore. Qui officia commodo irure velit exercitation occaecat ipsum irure est exercitation ad reprehenderit ea tempor. Id nulla minim sit nostrud excepteur incididunt mollit ipsum amet ad nulla amet incididunt cillum.",
    docNumber: "33 37 9(g)",
    docType: "sop",
    title: "voluptate cupidatat anim officia velit ad"
  },
  {
    office: {
      title: "Office of deserunt in",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Thu Mar 02 2017 09:56:47 GMT+0000 (UTC)",
        effectiveDate: "Mon Jan 11 2010 22:45:12 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Wed Jul 19 2017 07:29:52 GMT+0000 (UTC)",
        effectiveDate: "Mon Mar 26 2012 00:39:22 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Wed Mar 22 2017 22:06:26 GMT+0000 (UTC)",
        effectiveDate: "Mon Dec 29 2014 04:40:55 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["501(c)"],
    body:
      "<p>Laborum id ullamco minim dolore. Ea adipisicing aute minim minim proident adipisicing. Id nostrud veniam consectetur proident qui quis ipsum deserunt eu. Irure deserunt Lorem occaecat ut culpa tempor dolore eiusmod aute adipisicing Lorem sunt fugiat.</p><p>Tempor fugiat dolor duis culpa ad. Consequat id eiusmod eiusmod eiusmod ullamco anim qui velit. Consequat ex ex esse cupidatat sit tempor in incididunt ex minim elit officia cupidatat consectetur. Officia Lorem tempor occaecat tempor ipsum consequat nostrud elit incididunt. Veniam officia minim velit minim duis et. Excepteur et commodo deserunt deserunt velit consequat. Dolore elit adipisicing nostrud eiusmod velit officia.\n\nEu ad labore duis officia officia ex exercitation sit enim velit eiusmod deserunt elit mollit. Anim proident mollit dolore laborum anim eu adipisicing. Ad eiusmod consectetur consectetur cillum duis proident sint aute amet elit non. Quis Lorem dolore fugiat do nostrud ea mollit anim commodo. Nulla culpa consequat ullamco eiusmod. Pariatur aliquip culpa ad consectetur est ea sit sint laborum. Est amet ea sunt exercitation excepteur nostrud ea pariatur reprehenderit qui elit.\n\nLabore ut duis labore officia amet mollit dolor ea ullamco do commodo officia. In esse eu ipsum consectetur enim minim ea anim proident enim fugiat nulla quis culpa. Amet adipisicing cupidatat veniam proident. Et Lorem culpa fugiat elit ad officia est mollit adipisicing exercitation pariatur Lorem. Incididunt incididunt quis et consequat anim irure laboris exercitation anim excepteur consequat veniam eiusmod cillum. Exercitation ullamco excepteur ipsum duis labore consequat pariatur do eu aute nulla reprehenderit adipisicing sint.</p><p>Ad officia ut consectetur occaecat fugiat cupidatat dolore cupidatat. Eiusmod magna cillum id deserunt esse velit sit amet fugiat consectetur occaecat non. Occaecat deserunt nisi tempor ad qui ut mollit.\n\nAdipisicing irure excepteur duis ullamco ipsum irure do eu deserunt occaecat reprehenderit. Esse consequat voluptate enim elit aliquip est exercitation cupidatat ut esse occaecat. Et amet nisi ipsum eiusmod ea exercitation eiusmod ut amet eu. Lorem officia sunt fugiat anim et minim laboris mollit id aliqua minim. Nostrud veniam est deserunt mollit est voluptate elit id ipsum reprehenderit enim quis. Et id proident excepteur officia consectetur culpa nulla dolor consequat aliqua est anim Lorem. Labore do nisi incididunt sunt eiusmod eu anim dolor id esse deserunt.\n\nAliquip laboris esse adipisicing fugiat tempor consequat esse pariatur. Voluptate aliqua quis sit occaecat mollit adipisicing dolore irure officia. Nisi commodo cupidatat qui culpa sunt dolore incididunt non mollit adipisicing nostrud occaecat non deserunt. Do in ut exercitation consequat dolor ea eu magna. Culpa cillum sint sunt aute.\n\nQuis veniam et nisi do incididunt eiusmod occaecat cupidatat. Pariatur excepteur elit labore quis nostrud ipsum ipsum commodo. Aute eu ut duis esse nisi ut ad quis dolor pariatur fugiat quis. Occaecat dolor laborum aliquip velit aute tempor aute mollit do tempor Lorem tempor. Minim ut adipisicing duis commodo. Commodo deserunt dolore incididunt nulla deserunt anim fugiat dolor esse sit anim irure. Amet laborum tempor eiusmod nulla id.\n\nEx fugiat laborum fugiat commodo reprehenderit incididunt laboris esse sit reprehenderit aliquip ipsum quis sunt. Cillum ipsum nulla duis consequat qui occaecat incididunt esse est. Magna cillum nostrud commodo ullamco officia minim commodo esse amet. Culpa velit ad do duis aute labore. Velit amet quis amet nostrud voluptate nisi consectetur ullamco quis amet non.</p><p>Veniam tempor minim laborum sunt labore aliquip laborum commodo laboris labore sit reprehenderit aliqua. Occaecat laborum magna reprehenderit minim. Ipsum esse do amet ut ipsum consectetur tempor tempor in consequat non est id consequat. Enim sit veniam sint pariatur laboris aute quis esse ut ipsum sit et nulla. Minim pariatur ullamco enim mollit consequat adipisicing incididunt sint commodo enim enim aliquip esse. Laboris commodo eu cillum reprehenderit commodo ut.\n\nExcepteur ullamco minim consectetur laborum. Aute Lorem adipisicing adipisicing est consequat proident. Sint cupidatat cupidatat do nostrud non ea duis sit ad aliquip. Aute eu aliquip sunt proident dolor consequat ut.\n\nProident nisi laborum Lorem consequat adipisicing voluptate sunt. Occaecat id quis excepteur mollit cupidatat ex Lorem. Nulla ut excepteur amet Lorem qui id deserunt ea. Ea amet mollit nostrud Lorem. Dolore irure enim consequat minim reprehenderit exercitation in ad esse anim ex sint eiusmod. Cupidatat deserunt et eu eu magna nostrud deserunt sint ullamco veniam commodo minim aliqua. Ipsum culpa pariatur eiusmod laboris commodo dolore cillum culpa.\n\nPariatur voluptate enim tempor adipisicing nostrud laborum ad. Est nisi do aliqua laborum esse nulla occaecat cupidatat nisi quis. Dolore non deserunt qui id do sit officia magna. Eu esse ut incididunt fugiat. Velit laborum elit sit velit id aliquip Lorem veniam est eu velit occaecat pariatur. Adipisicing dolor id cillum commodo non aliquip ut cillum magna qui amet elit. Laborum aute exercitation nisi adipisicing tempor esse et cupidatat labore reprehenderit.\n\nIn exercitation amet enim Lorem elit culpa veniam non reprehenderit ut laboris in enim. Cillum incididunt anim exercitation nostrud irure reprehenderit. Aute ad elit exercitation qui id. Laborum ad est fugiat ad magna.</p>",
    summary:
      "Incididunt proident laboris eiusmod dolore. Consequat esse commodo elit cupidatat minim labore qui. Id fugiat irure sint non. Adipisicing esse est velit reprehenderit magna in amet deserunt. Incididunt voluptate officia quis aute ex veniam nostrud laboris enim enim eiusmod laborum commodo pariatur.",
    docNumber: "5 20 6(g)",
    docType: "sop",
    title: "quis consectetur ipsum labore mollit officia"
  },
  {
    office: {
      title: "Office of reprehenderit aliqua",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sun Feb 26 2017 22:29:28 GMT+0000 (UTC)",
        effectiveDate: "Wed Apr 02 2014 20:04:31 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Mon May 08 2017 19:31:21 GMT+0000 (UTC)",
        effectiveDate: "Sun Mar 08 2015 12:17:48 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Mon May 01 2017 11:22:55 GMT+0000 (UTC)",
        effectiveDate: "Tue Dec 07 2010 00:00:51 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC", "8(a)"],
    body:
      "<p>Voluptate eiusmod aliquip laborum do dolore mollit id excepteur ea incididunt pariatur fugiat. Do quis in sint eu dolor. Deserunt in adipisicing nulla aliqua occaecat et ex laborum velit esse velit quis deserunt. Eu ullamco occaecat pariatur nisi id excepteur laborum ad officia anim excepteur mollit. Labore tempor sint esse ipsum ad tempor veniam. Ut duis magna officia nostrud.</p><p>Aliqua duis exercitation sit sint cupidatat nulla labore nulla aliqua sit et velit. Sint sunt ullamco labore esse eu deserunt officia cillum occaecat excepteur sint incididunt occaecat laborum. Nisi esse mollit veniam cupidatat aliqua et commodo occaecat sunt incididunt irure et. Reprehenderit minim consequat quis elit laboris enim. Labore culpa ullamco deserunt ad laborum eiusmod nulla proident dolore sunt in veniam. Ullamco non ullamco ipsum minim voluptate pariatur nisi cillum amet aliquip nulla magna commodo qui. Dolore fugiat culpa nostrud consequat culpa reprehenderit ullamco commodo proident dolore consectetur.\n\nMagna mollit incididunt veniam laboris adipisicing sit. Dolore labore aute aliquip aliquip proident quis amet ipsum. Dolor ex in ex aliqua proident veniam officia anim velit proident sunt dolor commodo. Qui voluptate cupidatat minim esse. Elit officia occaecat reprehenderit occaecat minim quis. Proident sint adipisicing cillum ipsum consectetur.\n\nIn voluptate ex dolor excepteur reprehenderit in ipsum consequat esse ea cupidatat aute Lorem. Consequat reprehenderit ea culpa deserunt labore aliqua est cupidatat enim sit qui. Ipsum cupidatat eiusmod magna est ut aliquip amet tempor labore eiusmod tempor ea anim. Exercitation do cupidatat eiusmod mollit quis deserunt id id.</p><p>Do sint nostrud et dolore aute ipsum consequat anim deserunt tempor eiusmod enim. Dolore laborum esse minim eiusmod voluptate esse sunt quis est sunt excepteur. Adipisicing ea labore reprehenderit mollit dolore in ut duis mollit aliqua consectetur nulla voluptate. Qui esse consequat amet veniam nostrud officia tempor commodo consectetur nisi est elit mollit nulla. Pariatur nostrud ullamco elit est sunt laborum est proident reprehenderit proident ut. Quis ad magna consectetur excepteur ut deserunt officia labore. Ea aute consequat aliqua consequat laboris laborum quis aliquip duis occaecat ad qui veniam id.\n\nNulla consectetur proident nostrud aute laboris. Incididunt eiusmod enim irure laboris esse ea sunt in laboris enim. Nostrud deserunt laborum et ad occaecat. Cupidatat officia nulla in in nisi aliquip consequat mollit consectetur tempor in excepteur. Commodo sint commodo voluptate veniam veniam ut nulla minim ex sint in. Adipisicing quis ea enim exercitation laborum ex dolore nostrud et amet adipisicing exercitation cillum dolore. Voluptate sint dolor et sunt reprehenderit dolore nulla amet commodo tempor.\n\nConsequat incididunt magna do dolore. Enim nostrud mollit culpa id incididunt. Sunt et aliqua dolore do ea tempor. Esse dolor nulla sunt eu id commodo incididunt elit amet magna.\n\nMollit est aliqua qui voluptate amet ad veniam. Eiusmod ad irure ipsum proident do magna non nulla anim et commodo. Cillum tempor officia non labore et laboris magna eu aute. Ipsum duis cupidatat consequat fugiat id culpa deserunt tempor consectetur consectetur velit in est minim. Tempor amet ut laborum aute cillum nostrud id reprehenderit aliqua.\n\nAd dolore minim ex laboris pariatur ex aliqua incididunt. Labore labore esse Lorem mollit aliquip aliqua non. Consectetur cupidatat aliquip laboris dolore velit ea voluptate ipsum culpa laboris cupidatat sint quis et. Proident ad eiusmod ipsum qui id enim. Lorem sit nulla sit labore eiusmod ad do irure dolor quis commodo elit.</p><p>Irure eiusmod aliqua Lorem laborum tempor deserunt officia elit pariatur aute aliquip eiusmod occaecat voluptate. Enim officia cillum exercitation eiusmod Lorem qui id do. Incididunt ea est reprehenderit excepteur velit ut id. Voluptate id quis ea labore qui proident minim et voluptate veniam. Magna qui minim aliqua ad proident mollit elit nulla.\n\nSint culpa fugiat cupidatat consectetur do labore proident consectetur consectetur. Aliquip ullamco velit cillum pariatur irure consequat. Ullamco laboris duis commodo aliquip ullamco duis amet. Voluptate et culpa dolore veniam non enim sint fugiat eiusmod eu aliqua ipsum. Sit sit minim laborum ad minim veniam cupidatat reprehenderit.\n\nVeniam esse ad voluptate eiusmod reprehenderit adipisicing reprehenderit culpa occaecat sint incididunt esse Lorem duis. Laborum mollit velit et ullamco ex sit magna culpa dolore deserunt incididunt nulla. Anim minim officia elit consequat esse quis est enim ex.\n\nNostrud enim veniam sunt tempor enim commodo exercitation non fugiat ex do commodo aliqua enim. Sunt est ex sunt sunt irure incididunt culpa voluptate. Do ipsum pariatur elit consectetur nulla.\n\nExcepteur mollit aliqua reprehenderit minim ipsum laboris amet cupidatat do nisi laborum nisi. Pariatur consectetur dolor cillum aute reprehenderit in. Lorem culpa in ipsum ea culpa irure nostrud id consequat labore id esse do. Sit ea tempor ad ex minim amet eiusmod veniam incididunt.</p>",
    summary:
      "Sunt voluptate ea ut commodo labore duis nisi voluptate. In dolor Lorem qui ex ut voluptate amet do ea duis duis laboris laboris. Pariatur eu est aliqua voluptate. Ad eiusmod non sit dolor. Aliquip labore cillum nulla dolore nisi eiusmod adipisicing sit. Dolore ea esse laboris dolor voluptate non labore excepteur dolor laborum ad exercitation esse exercitation. Cupidatat quis fugiat sunt consectetur excepteur fugiat non labore.",
    docNumber: "2 29 2(g)",
    docType: "sop",
    title: "labore excepteur ut velit ullamco esse"
  },
  {
    office: {
      title: "Office of elit elit",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sun Jul 02 2017 02:44:27 GMT+0000 (UTC)",
        effectiveDate: "Sat Jun 25 2005 00:29:02 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Thu Mar 30 2017 16:44:25 GMT+0000 (UTC)",
        effectiveDate: "Wed Apr 25 2012 01:00:09 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Mon Apr 24 2017 02:32:28 GMT+0000 (UTC)",
        effectiveDate: "Tue Feb 10 2009 08:59:35 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["CDC"],
    body:
      "<p>Magna aute eiusmod cupidatat ad veniam esse elit labore amet deserunt et do ex magna. Esse commodo sit ex tempor anim voluptate do. Aute sunt velit nisi occaecat qui velit aliquip. Deserunt cillum duis et laboris. Consequat aliqua dolor ad eu.</p><p>Ea dolore minim ut velit deserunt sunt Lorem. Anim enim proident ipsum do do labore. Cupidatat enim aliquip nulla anim. Sunt veniam sint dolor nostrud culpa veniam non pariatur sunt. Labore aute proident ut proident veniam do voluptate duis sunt ullamco. Amet est non eiusmod voluptate aute veniam duis occaecat irure ex.\n\nCupidatat minim aliqua labore quis tempor. Lorem tempor duis consectetur excepteur. Ex nisi veniam aliqua veniam officia reprehenderit mollit deserunt. Laborum exercitation laboris nostrud sunt in Lorem veniam occaecat.\n\nLaborum quis irure quis enim esse dolore fugiat deserunt. Non exercitation sunt duis ipsum sint dolore. Ut incididunt eu aliquip in minim eu Lorem in.</p><p>Cupidatat labore eu deserunt enim exercitation commodo dolor laborum adipisicing nisi excepteur deserunt consequat incididunt. Ea anim ex cillum aliquip. Reprehenderit irure mollit dolore elit ut laborum magna proident. Do qui ipsum reprehenderit duis eu officia veniam. Et occaecat consectetur anim elit enim cillum sint enim id.\n\nAliquip sit occaecat eiusmod voluptate sint nisi et Lorem esse. Proident reprehenderit commodo irure mollit labore sint. Voluptate voluptate minim amet consectetur quis adipisicing laborum labore ad occaecat adipisicing adipisicing ex nisi.\n\nIncididunt velit laboris esse sit esse excepteur eu exercitation sint nostrud. Nostrud sunt exercitation qui nulla commodo voluptate irure sint. Ex laborum irure aute veniam. Adipisicing ut labore dolor nulla ad. Ut adipisicing mollit irure est magna veniam deserunt laboris et sunt eiusmod.\n\nCupidatat sint tempor exercitation Lorem cupidatat nisi sunt est proident. Mollit quis elit ea cillum magna minim qui sit eu quis. Excepteur occaecat ad anim et non consectetur magna aliquip excepteur eu. Qui aliquip ea et dolore veniam dolor ipsum amet et laborum mollit eu veniam. Eiusmod incididunt commodo sit aute magna sunt adipisicing et velit deserunt commodo aliquip.\n\nId veniam occaecat ullamco mollit mollit dolor dolor. Esse nulla aute sint pariatur voluptate qui tempor. Voluptate ut culpa exercitation aute anim laboris officia Lorem Lorem culpa fugiat id ad veniam. Eu nostrud nulla ea non ut ut velit nostrud.</p><p>Quis pariatur sint nostrud eu. Pariatur sunt aliquip ullamco cupidatat id aute do anim ut. Consequat pariatur non quis incididunt officia.\n\nVelit dolore magna laboris enim excepteur enim id. Proident in duis Lorem sint qui aute incididunt. Ad nulla nisi in qui irure cupidatat velit excepteur incididunt minim ea amet. Voluptate fugiat et ea voluptate cupidatat non incididunt velit adipisicing. Aute exercitation quis consectetur mollit eiusmod veniam magna aliqua. Magna ut voluptate nisi eiusmod amet deserunt consequat eiusmod laboris. Ullamco ea dolore esse excepteur anim exercitation consectetur labore aliqua consequat Lorem in tempor voluptate.\n\nVelit ea ad mollit sint. Duis quis ut excepteur elit tempor eiusmod consequat officia adipisicing officia mollit aliquip aute eu. Pariatur ullamco occaecat veniam laborum ut elit ut sint. Eu voluptate magna Lorem culpa et esse esse anim velit ut duis dolore occaecat. In reprehenderit velit non cupidatat esse minim officia. Nisi velit culpa nisi dolor laborum in laborum nulla laboris velit quis mollit dolor. Mollit consectetur ut amet sunt elit elit elit eiusmod ipsum ea.\n\nSint tempor dolore in do. Do sit cupidatat pariatur laboris aute ex adipisicing pariatur ad tempor est ullamco. Tempor non nostrud ea nisi esse cupidatat esse enim labore nulla ipsum qui sunt. Laboris nostrud do ipsum et quis aute. Ut ea ullamco et commodo consequat sit deserunt duis labore excepteur laboris.\n\nConsequat minim adipisicing sunt Lorem laboris do dolore laborum ad culpa. Minim magna consequat culpa in reprehenderit dolore aute. Do tempor mollit culpa enim Lorem commodo. Consequat duis tempor laborum occaecat nisi quis tempor ipsum dolore enim nostrud. Nulla labore sunt enim ut tempor deserunt quis adipisicing non. Consectetur dolor nisi do non adipisicing ex aliqua qui culpa ullamco consequat in consectetur.</p>",
    summary:
      "Voluptate ipsum veniam irure eiusmod aliqua est non amet amet ex labore. Incididunt voluptate quis et sunt commodo ipsum deserunt id aute tempor consequat. Consequat nisi voluptate culpa et anim officia. Commodo quis incididunt dolore ut fugiat eiusmod voluptate dolor amet aliqua. Anim enim proident do consectetur proident qui ad anim.",
    docNumber: "15 30 9(g)",
    docType: "policy notice",
    title: "nostrud irure mollit reprehenderit deserunt anim"
  },
  {
    office: {
      title: "Office of commodo reprehenderit",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sat Jul 29 2017 04:00:56 GMT+0000 (UTC)",
        effectiveDate: "Fri May 06 2011 06:38:50 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Mon May 01 2017 10:07:41 GMT+0000 (UTC)",
        effectiveDate: "Thu Dec 03 2015 00:06:36 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Thu Mar 02 2017 11:14:27 GMT+0000 (UTC)",
        effectiveDate: "Wed Apr 23 2008 20:08:03 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC", "CDC", "501(c)"],
    body:
      "<p>Adipisicing esse esse officia minim laborum sunt. Aliquip dolore cupidatat nulla labore esse esse dolore aliqua. Sint anim aliquip qui tempor. Anim deserunt mollit deserunt irure ut ut aute velit commodo dolor consequat minim cupidatat. Ullamco nisi nisi sunt est consectetur ut do ipsum incididunt officia dolore aliquip. Labore amet cupidatat enim consectetur amet commodo.</p><p>Cupidatat duis laborum irure nisi adipisicing tempor incididunt do ullamco magna. Cillum Lorem nostrud non quis enim dolor. Ea consectetur ipsum reprehenderit ipsum eu quis exercitation elit laborum nulla adipisicing commodo aliqua. Ullamco ad pariatur Lorem nulla labore aute esse ea commodo deserunt consequat.\n\nEa incididunt do ullamco in pariatur cupidatat culpa anim aliquip. Exercitation reprehenderit laborum minim labore irure sit in officia mollit nulla veniam elit. Ut ullamco ex elit cupidatat aliquip duis occaecat. Nulla ipsum exercitation nulla anim ipsum. Laborum est aliquip nulla occaecat non duis consequat. Veniam ullamco nisi dolor pariatur ullamco proident minim excepteur sint. Pariatur aliquip velit duis duis nisi veniam ex veniam velit labore occaecat ad velit sunt.\n\nSit labore eu est dolore veniam cillum qui elit voluptate sit pariatur in dolor. Eu ex sit proident deserunt fugiat amet est eiusmod. Eu nisi culpa enim eu dolore nostrud deserunt quis magna incididunt.</p><p>Voluptate amet dolore exercitation nisi cillum qui non. Reprehenderit non amet cillum id quis et. Est adipisicing aliqua velit minim veniam minim proident tempor duis occaecat dolore. Ex laborum in laboris pariatur est. Dolor duis eiusmod esse mollit consequat qui adipisicing ullamco sunt pariatur laborum consectetur. Ullamco mollit eu ut reprehenderit consectetur.\n\nDolor ullamco dolor id esse reprehenderit consectetur duis irure commodo est Lorem do consectetur. Dolor reprehenderit aliquip amet velit officia aliqua reprehenderit reprehenderit mollit. Pariatur nostrud pariatur mollit adipisicing cupidatat magna aute ea deserunt cillum. Ipsum ea officia veniam voluptate quis voluptate mollit non aute Lorem cillum consectetur officia. Consequat aute occaecat consectetur mollit laborum pariatur. Labore occaecat culpa velit sit incididunt sunt duis esse consectetur consectetur nisi consectetur.\n\nAute id quis qui ullamco ea nostrud velit Lorem magna. Culpa deserunt amet irure est commodo excepteur esse consequat adipisicing consequat magna. In laboris voluptate aliquip culpa reprehenderit esse enim duis quis eu dolor fugiat voluptate laborum.\n\nAute sunt cupidatat magna cupidatat sit est consequat laborum enim aliqua. Enim nulla quis cillum eiusmod aliquip. Aliquip ad culpa laborum deserunt nisi aute aute labore. Magna ut exercitation est aliqua sint sit irure reprehenderit quis. Culpa sint irure amet ex officia. Incididunt exercitation minim culpa sint aliquip cillum laboris nostrud reprehenderit id fugiat labore excepteur. Ullamco tempor reprehenderit officia nulla laborum id esse incididunt esse dolor ut.\n\nQui dolor anim esse officia ut cillum veniam commodo laboris culpa velit ea. Elit labore aliquip culpa deserunt tempor sit excepteur sunt do sit. Minim tempor exercitation ea sint qui duis cupidatat nisi culpa nostrud cupidatat laboris.</p><p>Officia laborum incididunt incididunt commodo et officia quis eiusmod. Eu excepteur nisi nulla occaecat adipisicing officia sit et et proident incididunt. Aute nulla officia dolor veniam non consequat sit. Ea exercitation adipisicing Lorem ipsum amet pariatur anim eiusmod magna labore. Esse officia enim in qui velit officia. Ipsum elit in enim eiusmod nulla nisi reprehenderit. Incididunt ullamco ullamco proident ad id cillum.\n\nNostrud tempor labore deserunt in duis reprehenderit minim. Minim aliqua esse culpa ullamco consectetur do Lorem amet Lorem ea. Ipsum incididunt qui reprehenderit ipsum laborum. Mollit consectetur ut ipsum laborum sint irure et adipisicing velit laboris.\n\nAnim cillum esse nulla consectetur velit elit. Minim laborum ut consectetur fugiat. Commodo sit id laborum dolore labore ea eiusmod sint. In aute qui reprehenderit amet eu dolor nostrud cillum proident cupidatat.\n\nUllamco quis in nisi esse commodo. Ex adipisicing esse irure nulla. Consectetur nostrud aliquip in velit ex cupidatat exercitation ea Lorem. Sint laboris voluptate anim eiusmod mollit reprehenderit do eiusmod culpa. Ad Lorem non consectetur cupidatat non pariatur ullamco nisi aute cillum veniam laboris et nisi.\n\nOccaecat velit qui non sunt fugiat reprehenderit voluptate qui. Incididunt incididunt cillum occaecat eiusmod incididunt ut labore sit. Duis commodo aliquip mollit aute velit voluptate. Fugiat officia proident incididunt adipisicing esse fugiat cupidatat. Nisi nulla commodo quis aliqua fugiat esse mollit magna voluptate adipisicing. Enim tempor nisi sunt anim cillum dolore incididunt.</p>",
    summary:
      "Adipisicing amet cupidatat fugiat dolor id incididunt esse voluptate cillum Lorem voluptate. Consectetur nulla labore deserunt ut aliqua anim amet anim nisi. Proident in laboris eu ex elit anim. Consectetur est officia elit sint ut anim anim. Aliqua Lorem cupidatat ut cupidatat.",
    docNumber: "23 35 4(g)",
    docType: "policy notice",
    title: "adipisicing ut irure aute commodo qui"
  },
  {
    office: {
      title: "Office of laborum consectetur",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Fri May 26 2017 07:17:30 GMT+0000 (UTC)",
        effectiveDate: "Thu Sep 04 2003 20:15:57 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Mon May 29 2017 04:07:10 GMT+0000 (UTC)",
        effectiveDate: "Thu Jan 29 2015 05:03:39 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sun Apr 09 2017 22:11:53 GMT+0000 (UTC)",
        effectiveDate: "Thu Feb 12 2009 09:29:32 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["CDC"],
    body:
      "<p>Anim proident cillum eiusmod commodo occaecat exercitation dolor proident officia ea cupidatat ex duis. Non exercitation exercitation duis nostrud do dolor. Eu sunt laborum sit excepteur elit id incididunt et. Proident laborum voluptate do fugiat ullamco velit cupidatat tempor laboris labore eu sunt labore minim. Ad eu in reprehenderit cillum ipsum enim sunt labore velit qui do ad qui.</p><p>Sit et cupidatat velit esse ut. Dolor ad non elit aliqua deserunt amet do voluptate excepteur est reprehenderit. Consequat qui magna id qui sit. Officia magna sunt dolore cupidatat veniam deserunt do aliquip. Dolor est anim quis aliqua id tempor deserunt laboris commodo. Consequat est nulla ipsum eiusmod proident deserunt tempor nostrud. Commodo et irure irure eiusmod tempor anim quis consequat eu.\n\nVoluptate non velit exercitation amet adipisicing laborum ex nisi ut nisi. Quis labore sit et et laboris non id velit ullamco voluptate. Veniam incididunt officia aliquip aliqua labore voluptate consequat commodo. Proident eiusmod esse aute ad Lorem cupidatat sint eiusmod. Laboris reprehenderit proident exercitation minim ex nostrud mollit ad aliqua ex in ut. Aliqua amet id aliqua exercitation ex adipisicing cupidatat eu nulla in commodo minim laborum. Lorem et pariatur anim duis nulla cupidatat elit anim excepteur Lorem.\n\nVoluptate consectetur adipisicing ut aliquip irure eu laborum ea commodo minim nulla duis ea non. Nulla ut enim qui do laboris amet nostrud officia adipisicing aliqua. Pariatur amet eu culpa est nostrud. In occaecat elit qui consectetur amet consectetur exercitation irure magna. Dolore do cillum minim ut quis. Magna esse ad id laborum dolor eu fugiat quis quis veniam laborum nulla cupidatat ad. Enim anim magna mollit excepteur incididunt eiusmod minim ad elit culpa pariatur do minim.</p><p>Aliquip officia ipsum eiusmod exercitation id. Officia officia commodo velit minim veniam officia ullamco nulla elit nisi ipsum dolor. Incididunt do pariatur consectetur exercitation dolor deserunt ipsum ut Lorem proident anim incididunt adipisicing non.\n\nNisi cillum culpa proident qui consectetur nulla est ipsum sunt officia duis non. Irure exercitation et aliqua laborum ullamco sint proident. Quis consectetur anim duis anim ad amet velit id mollit esse quis. Elit et tempor nulla voluptate ullamco veniam et laboris non.\n\nNulla voluptate qui non qui excepteur minim consectetur consectetur mollit Lorem dolore velit consectetur ipsum. Tempor aliquip velit laboris qui nulla mollit qui laborum est qui exercitation pariatur. Aliqua sint eu fugiat do elit fugiat consequat eiusmod id amet. Occaecat enim ullamco irure nostrud aute. Officia velit sit consectetur sit commodo. Reprehenderit veniam aliqua esse commodo culpa.\n\nId veniam ut incididunt sint dolore minim. Tempor sit labore adipisicing ullamco culpa elit. Enim do Lorem ut proident occaecat ullamco irure pariatur adipisicing est voluptate sit. Exercitation irure nulla ut deserunt ex aliqua consequat officia ullamco. Culpa id proident proident nisi enim aute consequat officia velit. Et amet veniam sit excepteur incididunt magna irure voluptate ipsum ea. In in ea reprehenderit aliquip exercitation tempor amet laborum quis.\n\nAliquip deserunt veniam dolore culpa elit incididunt qui magna laboris laboris fugiat dolor reprehenderit esse. Adipisicing esse eiusmod est consectetur veniam ad mollit qui esse non duis sunt elit. Commodo dolore sit labore do nostrud dolore consequat cillum nostrud dolore. Proident nulla ipsum ea esse non. Magna ea exercitation cillum minim irure quis exercitation qui. Cillum pariatur adipisicing anim consectetur dolor ad eu et exercitation.</p><p>Adipisicing ea labore amet eiusmod. Occaecat quis commodo cillum in ex incididunt cupidatat laboris est nisi. Eiusmod velit adipisicing excepteur adipisicing incididunt qui mollit minim in enim tempor elit ut id. Cupidatat labore cillum proident Lorem ut ex aliqua fugiat aliqua magna fugiat ullamco amet. Sunt minim commodo qui magna. Commodo occaecat minim id adipisicing. Occaecat et voluptate irure mollit laborum magna proident officia nulla nisi.\n\nDolor aute laboris id ex voluptate occaecat exercitation in anim nostrud. Dolore esse do et ad ea laboris esse consectetur adipisicing magna. Aliquip adipisicing occaecat labore sunt.\n\nLabore ex proident minim proident veniam ullamco magna sint excepteur ad proident elit. Minim pariatur occaecat adipisicing incididunt dolore dolore. Nulla aliquip cillum pariatur culpa excepteur nisi minim ipsum labore.\n\nAliquip proident exercitation reprehenderit pariatur esse et aliquip. Et officia culpa anim in dolor id do consequat do proident veniam quis dolore veniam. Consectetur tempor aute in commodo enim cupidatat incididunt pariatur cupidatat nulla officia. Dolore dolore sint ex amet ullamco tempor sit ex consectetur. Nulla magna proident ad est velit proident laborum ipsum id. Anim deserunt fugiat labore laboris enim est ea nostrud mollit ea reprehenderit minim.\n\nQui deserunt quis fugiat minim elit. Enim minim minim et do pariatur non esse. Ut enim ut irure mollit nisi amet do nulla eu in id consequat. Magna duis ut ullamco officia aute veniam laborum. Labore exercitation deserunt fugiat laborum sit consequat sint.</p>",
    summary:
      "Laborum consectetur labore ad ut adipisicing. Ut duis reprehenderit labore veniam est. Nulla aliqua excepteur cillum id laboris.",
    docNumber: "26 6 8(g)",
    docType: "policy notice",
    title: "nisi ullamco cupidatat labore ad commodo"
  },
  {
    office: {
      title: "Office of consectetur mollit",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Tue Mar 14 2017 03:31:38 GMT+0000 (UTC)",
        effectiveDate: "Tue Jul 08 2014 13:23:17 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sun Jun 04 2017 21:37:23 GMT+0000 (UTC)",
        effectiveDate: "Fri Jun 23 2017 02:50:12 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sun Jul 30 2017 06:50:53 GMT+0000 (UTC)",
        effectiveDate: "Sun Sep 21 2014 05:57:39 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC", "7(a)", "501(c)"],
    body:
      "<p>Deserunt consequat est veniam voluptate velit et Lorem id. Pariatur commodo incididunt adipisicing in cillum ad ea aute aliquip mollit. Voluptate officia veniam et duis duis do nisi officia labore. Reprehenderit labore et ea cupidatat ea sunt excepteur enim pariatur mollit sit laborum reprehenderit consequat. Elit est pariatur do duis consequat deserunt aliquip ut voluptate amet pariatur. Ad laborum enim laborum id voluptate pariatur exercitation duis ea consectetur est tempor elit. Velit eiusmod sit nulla do officia fugiat ipsum minim fugiat culpa anim consectetur.</p><p>Et cillum cupidatat quis fugiat consequat tempor velit incididunt nulla cillum minim pariatur. Duis ut sint eiusmod deserunt minim eiusmod deserunt elit proident. Pariatur non excepteur deserunt ad laborum nulla ea.\n\nAute anim non sit quis deserunt nisi est ex ad eu. Voluptate et ea pariatur voluptate aliqua velit do excepteur voluptate sunt Lorem cillum fugiat magna. Deserunt et sint culpa quis incididunt laboris eiusmod adipisicing fugiat laboris elit proident cillum reprehenderit. Aliqua ad proident elit veniam. Velit adipisicing velit proident tempor velit culpa occaecat.\n\nDuis laboris sint cupidatat ipsum qui ex proident ex ullamco velit dolor in cillum. Commodo velit et reprehenderit ullamco ut pariatur adipisicing. Eiusmod laborum adipisicing voluptate deserunt dolor veniam. Officia laboris exercitation ipsum ad. Mollit ut eiusmod laborum Lorem do est labore magna anim reprehenderit aliqua nostrud tempor esse. Ipsum cillum duis qui ea nostrud excepteur exercitation velit quis ad est.</p><p>Consectetur est dolor incididunt proident dolor dolore veniam. Fugiat eiusmod voluptate mollit sit ea laboris. Consectetur eu cupidatat irure aliquip ad magna cupidatat do dolor labore occaecat nulla veniam. Ut ipsum amet eu veniam minim adipisicing magna fugiat laboris. Esse fugiat fugiat consequat labore est qui nulla ad ad.\n\nTempor ad voluptate id voluptate do. Quis ea elit laborum qui ipsum. Velit ipsum pariatur officia mollit fugiat velit velit. Duis officia velit irure duis. Ea non dolor et pariatur labore excepteur.\n\nAdipisicing reprehenderit dolor non mollit ea labore. Duis eu dolor aliquip pariatur officia irure eu in. Pariatur aliqua esse nostrud culpa laboris. Pariatur in culpa aute aliquip eiusmod cillum.\n\nQuis ullamco amet voluptate laboris et velit reprehenderit minim sit ex reprehenderit fugiat fugiat. Occaecat magna eu occaecat esse ullamco irure aliqua excepteur sint mollit eiusmod in eu ullamco. Enim sint consequat voluptate dolore commodo ea enim culpa labore qui et minim. Qui ea adipisicing ad sint excepteur non id cupidatat excepteur ipsum excepteur laborum sit elit.\n\nFugiat occaecat ullamco proident labore veniam ea amet duis. Quis consectetur proident ea ipsum amet anim velit cillum nisi. Id excepteur nisi dolore dolor. Sit consequat nisi officia proident nulla ipsum sunt aute consequat. Ullamco laboris reprehenderit anim ad nostrud exercitation do quis ullamco adipisicing adipisicing. Enim in irure proident voluptate nostrud ea consequat mollit culpa.</p><p>Reprehenderit consectetur occaecat est laborum velit non duis consectetur duis in dolor. Commodo ad deserunt laborum est quis eiusmod. Occaecat veniam ex anim voluptate veniam ex eiusmod sit quis sit officia excepteur. Aliquip ad magna enim proident id aliquip officia exercitation. Elit proident adipisicing exercitation minim laboris id sit in ullamco in adipisicing ex velit incididunt. Ex nostrud nisi qui proident incididunt labore do ullamco qui non. Nisi proident eiusmod laboris labore consectetur mollit et amet deserunt esse sint cupidatat eu velit.\n\nIncididunt officia irure magna reprehenderit aliqua ut excepteur. Minim ea irure et commodo ut et Lorem consectetur ullamco fugiat Lorem velit duis. Cillum excepteur magna excepteur nisi.\n\nAute dolor ipsum consectetur ad nulla cupidatat fugiat aliqua culpa. Ea aliqua dolor fugiat anim nostrud pariatur non consequat exercitation magna id fugiat qui. Culpa anim ex exercitation incididunt excepteur. Est nisi enim deserunt Lorem velit eiusmod adipisicing et voluptate amet aliquip excepteur qui in. Qui officia officia deserunt consequat fugiat velit sunt eu ea.\n\nEnim ex magna laboris in amet quis id ullamco adipisicing ad sint. Sunt do ullamco cillum consequat enim est irure pariatur est aliqua adipisicing nisi commodo. Excepteur quis id nulla cillum deserunt minim pariatur. Quis veniam elit consectetur est ipsum.\n\nEx labore amet ipsum esse cillum. Adipisicing culpa incididunt occaecat ut irure non mollit irure consectetur qui. Ullamco eiusmod proident excepteur eu cillum sunt velit laborum magna Lorem cupidatat culpa aliquip.</p>",
    summary:
      "Consectetur cupidatat amet sint fugiat ex reprehenderit consequat eiusmod qui veniam Lorem in aliqua. Magna aute Lorem amet aliquip. Proident reprehenderit Lorem amet occaecat fugiat quis incididunt elit nostrud sint sunt.",
    docNumber: "23 41 4(g)",
    docType: "policy notice",
    title: "aliquip nostrud fugiat irure non dolor"
  },
  {
    office: {
      title: "Office of voluptate elit",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Mon Jul 24 2017 08:09:56 GMT+0000 (UTC)",
        effectiveDate: "Tue Dec 20 2005 22:23:59 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Thu Jul 06 2017 23:20:11 GMT+0000 (UTC)",
        effectiveDate: "Wed May 11 2016 02:06:24 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sat Jun 17 2017 21:53:05 GMT+0000 (UTC)",
        effectiveDate: "Wed Oct 13 2004 19:59:10 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["501(c)"],
    body:
      "<p>Et ullamco nulla occaecat labore aliqua. Excepteur ut voluptate sint ex voluptate dolore commodo irure aute id ad. Fugiat consequat velit aliquip adipisicing enim consequat proident amet. Pariatur ea cupidatat ut mollit excepteur esse ad quis fugiat. Exercitation officia commodo ullamco aliqua minim culpa qui officia incididunt sint consequat quis tempor ut. Minim mollit fugiat anim pariatur pariatur elit est. Est dolore in voluptate sunt esse laboris reprehenderit Lorem quis veniam aliqua Lorem quis.</p><p>Do occaecat cupidatat proident tempor quis elit voluptate veniam cillum dolor ut in incididunt velit. Irure est id nostrud esse amet sint. Voluptate duis consectetur est aliquip dolor Lorem qui veniam ut sit. Nisi nostrud labore duis velit excepteur duis. Irure qui ea tempor adipisicing minim commodo consequat nostrud ad aliquip esse laboris. Quis aute eiusmod culpa commodo dolor deserunt dolor consectetur ipsum ex. Labore adipisicing elit sint cillum irure nisi aliquip cupidatat proident dolore et aliqua dolore.\n\nNisi consequat reprehenderit commodo non aute velit velit tempor in et anim. Ex nisi consectetur ut exercitation culpa elit. Laborum occaecat ullamco ipsum aliqua tempor.\n\nCommodo eu ad reprehenderit enim. Lorem cillum et ullamco quis Lorem incididunt aliquip fugiat sit velit aute exercitation. Aliqua consequat ut sint occaecat labore amet proident id do.</p><p>Eiusmod nostrud quis eu mollit culpa occaecat ea dolor quis duis nisi proident aliqua irure. Aliquip proident cupidatat non ullamco id elit reprehenderit qui eu anim ut laboris. Ad voluptate veniam minim tempor cillum laboris velit incididunt dolor fugiat nulla aliquip. Dolor quis amet anim commodo cillum laboris cillum in. Labore adipisicing cillum adipisicing sunt et. Excepteur sint dolore id velit aliquip enim in elit.\n\nEa aliqua elit sunt officia ullamco cupidatat labore adipisicing ex enim nostrud proident veniam occaecat. Id irure laboris laborum occaecat sit. Reprehenderit laborum tempor aliquip ullamco in ad ad adipisicing irure Lorem est. Sunt ad id consequat excepteur est. Consectetur aliquip incididunt labore velit tempor dolore deserunt sint non. Exercitation ea fugiat et enim ex eiusmod elit tempor cillum deserunt velit.\n\nIpsum in ut in reprehenderit laborum qui fugiat quis id do commodo incididunt quis id. Et Lorem consequat occaecat non eiusmod nisi non. Esse ipsum nostrud reprehenderit velit dolor laborum et dolor aute quis adipisicing non elit. Lorem velit sunt irure consectetur sunt esse commodo ea irure adipisicing eu tempor voluptate. Id magna ullamco consequat nulla fugiat exercitation. Reprehenderit laborum labore veniam tempor ad culpa qui mollit quis do ea officia.\n\nEiusmod nisi enim exercitation sunt sint dolor. Aute cillum aliquip esse tempor incididunt eu. Reprehenderit duis officia ipsum sit officia consectetur. Exercitation id Lorem velit nostrud anim officia incididunt sint esse veniam eu quis mollit.\n\nReprehenderit dolore incididunt proident cillum aute officia incididunt esse ut eu consequat fugiat et commodo. Culpa sint fugiat incididunt deserunt eu anim eiusmod exercitation quis. Id nulla do sunt sit cillum eu enim. Duis et elit est est pariatur ullamco eiusmod fugiat. Et exercitation sit mollit irure occaecat elit ut cupidatat anim in. Excepteur fugiat fugiat adipisicing in consectetur nostrud tempor voluptate velit do adipisicing cillum.</p><p>Enim reprehenderit sint aliqua sunt deserunt est velit id adipisicing nulla deserunt cillum incididunt tempor. Non dolore amet officia aliquip irure sunt qui et aute. Nulla fugiat nisi deserunt nostrud sit amet labore sit esse minim exercitation quis velit. Minim dolore fugiat velit fugiat nisi aute veniam veniam sit sit consequat ex commodo. Laborum laboris consectetur tempor aliquip eu incididunt dolor in tempor est mollit fugiat esse.\n\nCulpa enim enim nulla eiusmod duis velit consectetur anim. Dolor laboris culpa culpa ea esse eu cillum laborum. Cillum ex non fugiat non exercitation nisi. Excepteur velit sint mollit commodo laboris voluptate culpa do cupidatat.\n\nCommodo occaecat incididunt aliquip irure est occaecat ad quis fugiat. Incididunt cupidatat aliqua velit aute consequat est do. Eiusmod ipsum culpa magna labore culpa officia elit in deserunt velit veniam consectetur consectetur. Dolor minim incididunt cupidatat reprehenderit adipisicing. Incididunt elit ex nostrud occaecat proident consectetur enim ex labore excepteur adipisicing. Dolore velit laborum ad tempor fugiat magna id exercitation ad.\n\nNisi aute amet laborum culpa nulla nostrud. Cupidatat voluptate dolore elit fugiat laborum. Ad cupidatat nisi laborum qui laborum ullamco eu. Ipsum sit Lorem eiusmod in anim mollit duis cillum et sit. Anim labore cillum ea elit est id irure.\n\nOccaecat deserunt sunt labore irure esse ullamco ullamco officia sunt. Proident amet sunt sunt do proident velit. Ea tempor mollit sit commodo excepteur quis. Ea reprehenderit nulla elit irure incididunt pariatur ea ex aliquip.</p>",
    summary:
      "Nulla esse labore occaecat nulla magna. Et tempor officia tempor incididunt elit excepteur. Voluptate labore laborum duis occaecat. Est amet ex cupidatat pariatur ut sunt tempor quis veniam dolore Lorem.",
    docNumber: "28 44 4(g)",
    docType: "policy notice",
    title: "ad tempor ipsum qui deserunt sunt"
  },
  {
    office: {
      title: "Office of elit amet",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sat Jun 17 2017 23:18:02 GMT+0000 (UTC)",
        effectiveDate: "Sun Feb 06 2000 12:58:33 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Thu Jun 22 2017 21:16:45 GMT+0000 (UTC)",
        effectiveDate: "Sun Jul 31 2016 14:46:22 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Fri Jan 27 2017 11:55:55 GMT+0000 (UTC)",
        effectiveDate: "Sun Dec 12 2010 01:17:28 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["8(a)", "CDC"],
    body:
      "<p>Velit excepteur voluptate deserunt velit mollit enim cillum sit anim veniam sunt reprehenderit. Veniam proident reprehenderit consequat exercitation nulla esse eu. Sit adipisicing consequat nostrud ut laboris pariatur ullamco ut culpa. Tempor anim commodo minim dolor officia commodo consectetur labore sunt.</p><p>Magna eu eiusmod occaecat adipisicing enim cupidatat ipsum velit magna esse consequat non. Sint dolore culpa ad quis excepteur est ad in ut officia aliqua. Cupidatat dolor ullamco ex dolore mollit esse minim dolore exercitation est amet elit ipsum. Tempor eiusmod ullamco nostrud culpa id ex do sit. Exercitation ullamco amet tempor fugiat nisi dolore nisi nulla laborum consequat nulla.\n\nIpsum ad dolor ea anim irure. Nisi ut minim Lorem eiusmod laborum qui. Deserunt veniam non ad voluptate aliqua sint tempor ea nisi consequat sunt.\n\nDuis commodo exercitation ipsum nostrud ea est culpa consequat reprehenderit consectetur in elit. Mollit adipisicing et velit occaecat ex. Voluptate magna minim nisi excepteur aliquip aute. Exercitation eu in elit mollit commodo exercitation exercitation do. Qui voluptate Lorem voluptate enim id dolore veniam nulla labore. Et reprehenderit pariatur reprehenderit dolor. Id quis esse est irure irure commodo veniam exercitation laboris voluptate voluptate nulla.</p><p>Officia incididunt enim irure laborum fugiat eiusmod magna enim occaecat. Sunt veniam consectetur eu eiusmod ipsum non cillum. Eiusmod laborum reprehenderit Lorem ad duis elit et esse eiusmod id et. Et incididunt laboris veniam nisi enim nisi Lorem voluptate elit culpa tempor consequat ea consectetur.\n\nIncididunt reprehenderit ad id enim laborum velit qui est incididunt ad qui duis. Ullamco pariatur ullamco cupidatat voluptate aliquip elit elit sint amet velit cupidatat. Dolore ea cillum esse velit consequat voluptate elit ea cupidatat deserunt magna proident. Ex do irure culpa ea veniam culpa ipsum ipsum enim dolor laborum mollit amet do. Nulla est adipisicing voluptate labore. Veniam ad exercitation esse proident tempor esse et deserunt ex laborum ipsum ad cupidatat. Ullamco officia aliquip laborum enim occaecat fugiat labore esse consequat.\n\nExcepteur duis reprehenderit deserunt ullamco nisi adipisicing nisi consequat ex cillum commodo id eiusmod do. Voluptate velit proident sit elit elit. Adipisicing deserunt excepteur ut excepteur. Elit excepteur sit nostrud et. Adipisicing id est irure velit nisi duis cupidatat.\n\nCillum ad irure ea veniam Lorem. Est sunt commodo nostrud qui enim fugiat sint enim exercitation reprehenderit. Qui excepteur consectetur cupidatat duis irure irure. Esse sit deserunt elit occaecat cillum ex. Id magna non incididunt consequat sunt qui incididunt nisi sunt.\n\nAnim non non culpa occaecat do reprehenderit officia adipisicing irure aliqua minim eu dolore proident. Tempor dolore ex aute voluptate consectetur proident reprehenderit esse exercitation. Adipisicing aliqua ipsum ullamco tempor aute officia id pariatur minim voluptate proident sint ipsum. Esse consectetur esse amet cillum laborum veniam magna cillum mollit.</p><p>Quis excepteur et pariatur minim amet elit mollit ad fugiat fugiat sit cupidatat. Laboris id velit deserunt nisi tempor. Incididunt pariatur sunt minim mollit excepteur velit minim. Nulla enim ut amet est nostrud dolore aliquip magna. Deserunt mollit proident nisi dolore elit occaecat et elit consectetur veniam. Aute do exercitation proident elit fugiat voluptate sint sunt amet ad.\n\nLorem ex magna id est ullamco pariatur reprehenderit. Labore nostrud occaecat laboris eiusmod minim nostrud nulla est sit exercitation aute. Eiusmod aute qui consequat anim nostrud consequat excepteur. Lorem incididunt aute sit do nisi deserunt sit aute incididunt ut Lorem.\n\nCulpa aute ut in laboris ad velit veniam quis esse fugiat consectetur deserunt. Velit occaecat cillum amet aute irure dolor veniam minim sunt. Nulla reprehenderit laborum labore minim aute minim qui ullamco ullamco proident reprehenderit pariatur cupidatat.\n\nNulla ad qui ea labore elit. Est ad consectetur cupidatat fugiat. Incididunt voluptate culpa nisi reprehenderit tempor adipisicing nulla adipisicing. Cupidatat consequat veniam voluptate minim irure. Duis dolor do voluptate excepteur eu ea sit non officia occaecat. Ut mollit elit sint esse nostrud et et. Cupidatat id reprehenderit ut voluptate occaecat dolore veniam excepteur in id aliquip.\n\nEa occaecat cillum culpa ut adipisicing. Cillum irure fugiat aute ex ut irure proident ad ipsum magna qui veniam nisi sunt. Aliquip pariatur consequat reprehenderit ad laborum officia. Proident dolore in adipisicing Lorem deserunt cillum nisi excepteur enim cupidatat id veniam minim occaecat. Anim do ut eu nulla culpa in do pariatur velit dolore incididunt aute fugiat. Laboris fugiat officia Lorem et enim velit esse culpa dolor.</p>",
    summary:
      "Veniam eu voluptate adipisicing qui ullamco irure. Nisi ex reprehenderit Lorem incididunt dolore nostrud non sit proident irure occaecat eiusmod proident ut. Culpa ut qui officia quis veniam dolor excepteur deserunt magna anim. Dolore aliqua eiusmod enim ullamco tempor reprehenderit voluptate ut irure.",
    docNumber: "24 2 1(g)",
    docType: "sop",
    title: "consectetur non pariatur commodo ut laboris"
  },
  {
    office: {
      title: "Office of id excepteur",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Thu Feb 02 2017 05:31:54 GMT+0000 (UTC)",
        effectiveDate: "Mon Apr 05 2010 11:49:11 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Tue Jun 20 2017 01:29:42 GMT+0000 (UTC)",
        effectiveDate: "Thu Nov 18 2004 08:29:25 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sat Feb 11 2017 18:52:01 GMT+0000 (UTC)",
        effectiveDate: "Mon Feb 16 2015 00:08:54 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["8(a)", "7(a)"],
    body:
      "<p>Do incididunt anim proident laboris duis commodo do quis reprehenderit aute voluptate anim. Anim commodo tempor irure nisi cillum cillum minim. Officia culpa Lorem elit id ea.</p><p>Exercitation aute ut culpa non. Incididunt ipsum enim laborum veniam magna irure ea. Aliquip sit amet cillum pariatur id ullamco qui duis minim. In sit magna excepteur laboris. Velit irure sunt occaecat elit irure velit ad.\n\nAnim amet fugiat et incididunt aliqua Lorem et excepteur incididunt. Laborum commodo incididunt dolore duis et enim deserunt. Eu deserunt laborum anim incididunt in.\n\nIn est incididunt non ut est est elit sunt do irure cillum anim id. Qui eiusmod exercitation dolore non commodo Lorem enim do adipisicing deserunt id sint exercitation sunt. Eu mollit ut voluptate ex amet nostrud quis incididunt officia ad ea consequat.</p><p>Sunt nisi culpa voluptate consequat ex. Et qui do qui eiusmod quis ullamco dolore officia magna ex incididunt est minim id. Occaecat anim laboris sunt consequat. Elit id ipsum id voluptate magna est.\n\nIpsum voluptate id aliquip quis consequat laborum mollit eu ut elit do. Nostrud tempor Lorem pariatur non et cillum mollit. Lorem consequat ea culpa veniam. Elit tempor occaecat ea pariatur magna nostrud. Consequat duis eiusmod amet non ea tempor. Magna consequat cupidatat qui quis sint velit tempor.\n\nIncididunt sint aliqua aute ut nulla sit nisi dolor incididunt sint occaecat duis ipsum elit. Aliquip cillum deserunt magna nulla Lorem consectetur laboris incididunt laborum ex fugiat amet. Excepteur excepteur id laboris enim consectetur nulla non ipsum adipisicing adipisicing. Cillum nostrud sit nulla exercitation eiusmod excepteur cillum commodo adipisicing. Consectetur nulla non eu quis commodo fugiat mollit do quis anim anim consequat id.\n\nLabore anim adipisicing labore et exercitation amet exercitation non eu aliquip mollit. Dolore consequat qui sunt veniam duis nisi quis ullamco reprehenderit dolor elit Lorem. Reprehenderit exercitation sint veniam enim enim dolore non culpa id pariatur ea aliqua. Veniam anim aliqua pariatur veniam aliquip dolor est nisi nostrud adipisicing.\n\nLaborum reprehenderit ut et duis velit irure sunt aliquip commodo aute ea adipisicing qui ad. Labore cillum mollit minim fugiat. Anim sunt elit esse nostrud et dolore tempor consequat elit esse exercitation.</p><p>Ipsum ullamco do amet irure in ad laboris laborum incididunt. Ex adipisicing in consectetur excepteur sunt nulla anim. Deserunt reprehenderit veniam fugiat fugiat in aliqua dolor id veniam eu veniam nostrud ea. Elit duis deserunt nulla id aliquip quis.\n\nEu do esse labore incididunt excepteur ut occaecat occaecat amet non exercitation aliquip. Tempor do aliquip ullamco aliquip tempor dolore dolor. Commodo tempor nisi nostrud id minim nostrud commodo laborum occaecat velit eu. Excepteur nisi amet culpa mollit ipsum deserunt aliquip duis magna cupidatat pariatur incididunt quis enim. Irure et mollit minim anim aliqua consectetur elit quis mollit culpa Lorem aliqua reprehenderit excepteur. Eiusmod officia sit anim exercitation anim id.\n\nSint ullamco mollit reprehenderit aute incididunt excepteur ut cillum aliqua adipisicing. Amet incididunt proident anim duis id do quis culpa. Elit reprehenderit ut dolor aute Lorem commodo ut qui aliqua quis nisi veniam et. Aliquip reprehenderit ullamco ut enim. Consectetur sunt adipisicing labore elit elit adipisicing quis Lorem.\n\nNon proident pariatur excepteur nostrud incididunt. Elit laboris aliqua esse culpa Lorem. Sunt occaecat aliquip laborum excepteur. Voluptate velit mollit reprehenderit labore adipisicing est. Mollit aliquip fugiat consectetur nisi ut eiusmod eiusmod ad commodo consequat.\n\nFugiat id nisi id officia occaecat culpa laboris velit fugiat. Sunt occaecat cupidatat velit anim velit minim nostrud ea est reprehenderit sit eiusmod incididunt. Quis nisi elit exercitation quis id nulla.</p>",
    summary:
      "Id cillum qui ea quis. Cupidatat occaecat labore incididunt est deserunt voluptate enim nulla ad sunt aliquip tempor ex mollit. Eiusmod labore dolor amet laborum. Aliqua deserunt commodo est velit excepteur laboris aliqua proident fugiat. Velit reprehenderit tempor cupidatat aliqua elit proident reprehenderit minim.",
    docNumber: "4 24 9(g)",
    docType: "sop",
    title: "qui ut enim anim aliqua labore"
  },
  {
    office: {
      title: "Office of pariatur aliqua",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Thu Apr 06 2017 15:30:42 GMT+0000 (UTC)",
        effectiveDate: "Tue Oct 11 2005 02:41:17 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Wed Mar 22 2017 15:22:00 GMT+0000 (UTC)",
        effectiveDate: "Sun Jul 10 2011 09:39:37 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Wed Feb 22 2017 14:07:01 GMT+0000 (UTC)",
        effectiveDate: "Wed Apr 09 2003 18:26:28 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["7(a)"],
    body:
      "<p>Aliqua sunt dolore dolor anim anim elit occaecat ut ipsum quis. In sit exercitation ipsum laboris et. Excepteur proident non incididunt qui commodo. Sunt ea sunt ipsum et commodo ipsum id amet.</p><p>Voluptate ullamco ea aliquip commodo ea. Ullamco anim voluptate tempor laboris mollit pariatur. Cupidatat cillum incididunt aute Lorem eiusmod sunt cupidatat. Ea ipsum labore aliquip aliquip proident laborum elit excepteur laborum aliquip occaecat do. Sunt commodo anim velit laboris occaecat consequat velit nisi aliqua et nisi aliquip nulla anim. Fugiat ullamco ea culpa proident commodo. Ipsum mollit voluptate ipsum ea Lorem laborum minim dolore voluptate.\n\nIn laboris sit aute ea fugiat Lorem consequat eu reprehenderit non ea. Ut laborum duis pariatur anim sunt esse fugiat. Laboris quis culpa in officia id aliquip incididunt cupidatat ullamco consectetur Lorem. Eiusmod nostrud duis commodo magna ad elit consequat nostrud ipsum. Consequat qui eiusmod laboris exercitation eiusmod magna labore eu aliqua consequat minim. Deserunt fugiat anim eu cupidatat est est exercitation pariatur occaecat consectetur cillum.\n\nEt enim nulla Lorem fugiat pariatur do irure sunt quis dolore ullamco. Reprehenderit culpa aliquip qui eiusmod et enim irure labore incididunt cillum exercitation sunt. Tempor esse aute elit Lorem sunt ut. Duis dolor labore cillum tempor tempor non incididunt amet sunt laboris culpa. Dolor reprehenderit ut nisi qui. Laboris exercitation enim adipisicing qui est incididunt laborum amet enim et laboris elit do ea. Aute ad enim eiusmod non quis commodo consectetur laborum culpa velit consectetur aute.</p><p>Magna ad dolor quis dolore non culpa. Dolore laboris est Lorem duis. Do est incididunt nisi tempor enim nulla laboris reprehenderit dolore amet. Lorem id occaecat mollit culpa id fugiat labore consectetur. Incididunt eiusmod qui Lorem enim ipsum.\n\nProident amet dolore deserunt est nostrud cupidatat consectetur nostrud. Aliqua culpa aute tempor occaecat laboris consectetur deserunt tempor ad commodo aute ea cupidatat consequat. Fugiat amet est dolor deserunt culpa proident cupidatat consectetur. Et ut ex ea minim voluptate consectetur duis voluptate consequat Lorem cupidatat occaecat. Fugiat amet incididunt minim pariatur fugiat laborum reprehenderit laborum dolor in. Enim anim excepteur laborum qui aliquip consectetur anim reprehenderit enim ipsum aliqua.\n\nAd non nulla culpa nostrud incididunt qui nisi proident anim cillum cillum mollit pariatur. Lorem commodo incididunt velit voluptate mollit qui proident ipsum officia quis excepteur commodo sint. Ipsum pariatur ipsum in veniam occaecat duis esse tempor occaecat. Culpa velit in consequat amet cupidatat occaecat sit ea eiusmod commodo. Ut cillum commodo exercitation incididunt proident aliqua pariatur ipsum laboris. Adipisicing id consectetur incididunt reprehenderit deserunt anim do quis laborum dolor.\n\nIn duis do sunt sit velit aute reprehenderit occaecat magna. Minim consequat irure culpa ad mollit laboris do proident non laborum exercitation excepteur mollit ex. Tempor adipisicing nisi pariatur exercitation velit excepteur. Consectetur laborum cupidatat deserunt amet enim eu. In cupidatat veniam veniam cupidatat est ut velit esse anim veniam consectetur aute veniam. Anim fugiat officia sint ad deserunt dolore id eu ex dolor nostrud ullamco in.\n\nSit aliquip pariatur est deserunt ullamco anim ex sit ut consequat deserunt occaecat nisi aliquip. Incididunt adipisicing laborum qui minim. Eiusmod ex velit nisi laboris pariatur id dolor. Labore quis reprehenderit et duis sit labore proident ad. Adipisicing enim pariatur pariatur qui enim pariatur. Incididunt pariatur sint cillum ipsum.</p><p>Anim fugiat nulla cupidatat dolore voluptate dolore Lorem magna consequat sit. Exercitation exercitation enim aliqua quis aliqua. Pariatur cupidatat ea nostrud id veniam magna. Nulla reprehenderit fugiat quis ut esse ut. Minim eu aute officia reprehenderit qui sunt voluptate dolore adipisicing officia.\n\nCulpa laboris pariatur consectetur amet exercitation quis proident velit commodo enim voluptate laborum incididunt. Irure laborum ipsum quis ex dolore voluptate ex exercitation dolore labore. Labore culpa qui magna proident elit tempor culpa. Est laborum officia sint excepteur.\n\nAute nisi ad voluptate eiusmod elit veniam labore enim consectetur proident culpa. Elit occaecat cupidatat incididunt id ex. Id aliquip consectetur adipisicing nisi amet elit velit tempor occaecat velit. Et id eu culpa ex aliqua. Enim proident minim dolore incididunt. Eiusmod cillum Lorem occaecat sunt quis nisi tempor aliquip magna ullamco adipisicing duis eu exercitation. Eu et eu duis laboris deserunt deserunt ad laboris incididunt enim ex.\n\nLabore voluptate laborum reprehenderit cillum voluptate eiusmod adipisicing exercitation in anim occaecat exercitation. Laborum veniam adipisicing officia eu et dolore deserunt duis dolor esse sunt minim ad minim. Dolore adipisicing ex ipsum irure est aliquip. Ut exercitation minim fugiat Lorem velit irure elit aliqua elit labore pariatur aute in. Nisi Lorem ut incididunt qui fugiat. Incididunt sit aute magna cillum anim.\n\nAute deserunt et ipsum adipisicing velit cillum enim voluptate Lorem occaecat Lorem enim fugiat ullamco. Quis proident ut sunt sunt ut eu excepteur esse. Non exercitation laborum incididunt duis tempor anim. Veniam eiusmod ullamco ullamco laborum laboris labore in irure adipisicing veniam ea non. Aliquip ut ullamco do laborum nulla veniam voluptate nulla ad reprehenderit est consectetur pariatur. Ut excepteur cupidatat nostrud et mollit aute ut laboris pariatur eu eu mollit consequat exercitation. Consectetur aliquip sit dolore mollit aute deserunt elit.</p>",
    summary:
      "Ea non exercitation sit excepteur cupidatat eu sint ad. Deserunt dolor voluptate in est. Nostrud fugiat cillum esse veniam aliqua enim dolore pariatur sunt sint sit sit elit non. Ex laboris non ad sunt commodo esse. Quis non magna do consectetur sint officia qui laboris sunt proident dolor aute id.",
    docNumber: "47 38 8(g)",
    docType: "policy notice",
    title: "consequat elit enim quis consequat et"
  },
  {
    office: {
      title: "Office of incididunt incididunt",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Mon May 08 2017 17:25:09 GMT+0000 (UTC)",
        effectiveDate: "Sun Oct 12 2003 18:56:14 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Wed Feb 08 2017 05:17:13 GMT+0000 (UTC)",
        effectiveDate: "Mon Jan 18 2016 17:35:15 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Thu Mar 30 2017 13:06:44 GMT+0000 (UTC)",
        effectiveDate: "Thu May 17 2001 19:26:17 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["CDC"],
    body:
      "<p>Esse ipsum excepteur sint in sint dolore. Dolor consectetur non et est ad exercitation ad nisi Lorem laborum sunt. Cillum ea officia cillum velit excepteur non eu enim excepteur fugiat enim.</p><p>Dolor laboris consectetur culpa minim magna esse. Consectetur Lorem enim velit Lorem cupidatat amet aute ullamco est do dolore culpa est. Ullamco sint voluptate incididunt nostrud eu reprehenderit voluptate voluptate laboris labore sint ullamco ut labore.\n\nEu ex occaecat do veniam. Laboris nulla ut do nulla. Aliqua ut elit ea ut laboris ipsum tempor anim tempor est. Aliquip laboris eu exercitation consequat culpa sint proident non eiusmod. Commodo ad elit ullamco proident magna laborum velit cupidatat pariatur. Excepteur magna nisi laboris pariatur id pariatur cupidatat aliquip veniam velit nisi adipisicing mollit voluptate. Nostrud cillum sit consequat Lorem ipsum ut pariatur cillum sint duis cupidatat velit.\n\nQui consectetur mollit anim reprehenderit magna consectetur anim consequat eu reprehenderit proident irure tempor nisi. Elit nulla amet commodo tempor nostrud qui tempor quis reprehenderit officia in ipsum. Laborum ad amet cupidatat irure cupidatat mollit id culpa fugiat ad.</p><p>Consequat cillum et proident aliqua occaecat. Enim velit mollit cillum velit cillum incididunt eu id eu pariatur elit. Est aliqua adipisicing commodo occaecat. Minim et ex proident sint nisi consequat esse. Esse aute veniam anim elit incididunt fugiat est cupidatat quis ad eu veniam dolor ad. Ad velit elit magna id excepteur. Dolor veniam eiusmod sunt consectetur aliqua labore minim quis occaecat tempor consectetur dolore.\n\nCupidatat eu Lorem aliquip magna incididunt ipsum ex veniam. Id eu qui et nostrud aute adipisicing. Adipisicing ipsum pariatur dolor nisi eu non consequat Lorem proident. Labore proident sit nisi quis anim exercitation qui proident amet. Labore dolor velit Lorem veniam consectetur cillum sit cillum ipsum aliqua elit nulla veniam. Duis nisi Lorem pariatur eiusmod est esse Lorem eiusmod esse veniam.\n\nAute nostrud commodo occaecat in fugiat consequat exercitation excepteur. Voluptate ad sunt Lorem mollit velit ipsum proident nisi commodo nostrud duis laborum ex exercitation. Anim consequat ad labore labore incididunt adipisicing commodo Lorem officia exercitation pariatur cupidatat ullamco non. Mollit officia amet eiusmod aute nostrud sit anim esse eiusmod esse reprehenderit anim. Quis Lorem ut voluptate ut ipsum elit nulla officia officia duis excepteur consectetur velit enim.\n\nNon dolore officia laboris anim irure in. Fugiat qui proident laboris ea aute sunt do. Commodo duis dolore irure incididunt voluptate duis qui exercitation ex est et cupidatat aute.\n\nExcepteur in nulla sunt minim. Ipsum aliqua veniam in est voluptate elit elit exercitation esse elit est. Cillum consectetur nisi minim irure excepteur. Irure deserunt amet qui exercitation Lorem tempor. Ipsum fugiat et dolor Lorem non excepteur irure quis voluptate duis sit.</p><p>Cupidatat consectetur ullamco anim do voluptate laborum irure non commodo elit incididunt sunt officia reprehenderit. Duis ex mollit id nulla est labore do sint exercitation duis sit sint commodo. Non reprehenderit eu consequat pariatur pariatur fugiat dolor amet est est sit do. Fugiat nostrud nisi tempor ullamco. Nulla quis cillum eiusmod labore excepteur eu ad minim duis Lorem nisi nulla. Amet nisi non nisi et eiusmod esse.\n\nVeniam voluptate minim labore dolor dolor ipsum consequat. Esse fugiat minim sit dolor adipisicing aute nisi exercitation. Sint ipsum sint esse voluptate qui Lorem ex pariatur. Sunt ut labore reprehenderit aute irure velit cillum magna Lorem. Excepteur laborum occaecat aliqua velit ut nulla. Ea ea laborum aute do officia elit duis occaecat et pariatur laboris et.\n\nExercitation consectetur irure velit pariatur eiusmod adipisicing. Cupidatat sint sit enim proident non. Sit ad duis proident incididunt commodo pariatur adipisicing aliquip ut Lorem elit eu. Nulla et deserunt mollit magna nisi pariatur anim amet officia. Duis Lorem elit aliqua mollit ut fugiat. Tempor aliquip cillum non elit esse enim laboris.\n\nIn ea nulla nulla labore ea eiusmod aute ex ad duis ex non. Amet et aliqua pariatur ullamco eiusmod sunt. Fugiat qui proident veniam cupidatat mollit adipisicing voluptate. Labore exercitation aliquip proident irure amet sunt sint dolor nisi laboris.\n\nEsse ea officia proident aliqua ea aliquip eiusmod elit aliqua. Voluptate ea enim aliquip cillum. Ex sunt laboris enim enim labore. Minim et incididunt eiusmod esse Lorem id aliquip ad do culpa officia mollit voluptate tempor. Consectetur culpa laboris enim nisi reprehenderit labore cupidatat nisi exercitation in velit pariatur ullamco fugiat. Est aliqua nulla fugiat officia exercitation deserunt magna ipsum sint ut sunt.</p>",
    summary:
      "Ut ipsum eu deserunt laborum do eiusmod cillum. Nisi labore sint officia minim Lorem dolore ut reprehenderit. Velit ut labore aliquip non nulla cillum eu amet non occaecat labore. Aliquip officia dolor tempor incididunt ex esse. Ad exercitation ex id ad. Fugiat est do deserunt do amet enim sunt veniam do ad esse veniam qui elit. Minim officia et ad sint sint.",
    docNumber: "38 31 5(g)",
    docType: "form",
    title: "consectetur laboris adipisicing irure ut laborum"
  },
  {
    office: {
      title: "Office of cillum mollit",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Fri Jun 23 2017 18:26:22 GMT+0000 (UTC)",
        effectiveDate: "Fri May 24 2002 10:54:07 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Mon Jan 16 2017 12:09:18 GMT+0000 (UTC)",
        effectiveDate: "Sat Mar 06 2004 02:44:25 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sun Mar 26 2017 03:43:15 GMT+0000 (UTC)",
        effectiveDate: "Thu Dec 10 2009 15:21:50 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["8(a)", "CDC", "501(c)"],
    body:
      "<p>Magna ex nisi est cillum commodo ipsum ad labore veniam. Mollit esse cupidatat consectetur in. Ex irure eu cillum incididunt. Deserunt nisi et ullamco commodo. Officia mollit labore Lorem amet dolor velit est cupidatat qui sunt. Ut pariatur irure voluptate velit qui.</p><p>Ut laborum pariatur velit esse anim velit nisi ipsum et exercitation. Ut est nisi non do nostrud ipsum qui. In dolor est cillum proident adipisicing ex magna mollit ipsum duis magna ea ipsum.\n\nConsequat labore voluptate Lorem esse aliqua proident esse dolore ullamco laborum excepteur quis occaecat minim. Aliqua qui magna eiusmod reprehenderit dolore aliqua id quis mollit reprehenderit ullamco. Commodo ea mollit sit occaecat laborum. Cillum ex magna irure ipsum elit non ipsum irure. Anim excepteur qui commodo aliquip exercitation in irure sit ea culpa.\n\nAliquip nisi id culpa commodo ad ullamco cupidatat adipisicing ex culpa dolor. Laboris occaecat in fugiat do sunt sunt ipsum occaecat cupidatat adipisicing eu. Sint fugiat consectetur tempor consequat culpa adipisicing fugiat non anim.</p><p>Sint qui duis nisi voluptate eiusmod. Do velit sit adipisicing cillum aliqua mollit exercitation officia. Esse aliquip incididunt irure pariatur et. Ut nulla amet officia do exercitation laborum ipsum excepteur esse. Duis quis do reprehenderit quis magna dolore eiusmod.\n\nAd id ut mollit sunt enim dolore irure nulla culpa qui do excepteur. Sint nostrud reprehenderit sit qui anim tempor mollit pariatur. Ea non officia in dolor quis occaecat duis. Incididunt adipisicing laborum incididunt eu dolore irure aliquip cillum fugiat aliquip.\n\nNulla cupidatat consequat ipsum velit est amet sint non aliquip laboris eu officia sint. Aliquip ad adipisicing amet Lorem voluptate officia. Ullamco anim ad culpa eu do non. Culpa exercitation duis pariatur consequat dolore qui officia. Nisi eiusmod reprehenderit Lorem fugiat sit tempor voluptate. Dolor nisi laborum consequat culpa anim dolor. Ipsum elit cillum ipsum sint excepteur.\n\nIncididunt cillum enim sit sint exercitation. Veniam aliqua in commodo do adipisicing. Cupidatat occaecat nulla veniam minim id sunt irure id. Velit laborum in velit cillum veniam nulla aliqua tempor non mollit occaecat. Duis incididunt aliquip deserunt excepteur adipisicing cupidatat irure quis ut cupidatat et. Ad nulla ex aliquip deserunt laboris.\n\nDuis mollit laboris ex sunt Lorem culpa ea in non ipsum nostrud. Elit sunt laboris magna nulla irure ipsum ea quis laborum irure sunt fugiat sit incididunt. Ex voluptate ea id qui dolore ad incididunt magna et do velit minim ullamco.</p><p>Commodo fugiat ex enim occaecat culpa aliquip voluptate. Exercitation sint esse pariatur enim occaecat velit aliquip proident enim enim mollit laboris proident. Eiusmod proident duis qui voluptate officia reprehenderit deserunt enim minim irure ipsum labore et fugiat. Quis adipisicing nisi reprehenderit ut eu. Aliqua mollit incididunt occaecat amet.\n\nEnim elit aliquip consequat aute ipsum eiusmod nisi. Ea velit laboris non sint laboris anim aute nisi quis ex qui commodo. Quis fugiat voluptate sunt quis commodo adipisicing ut veniam labore ad. Laborum veniam incididunt cupidatat occaecat consectetur velit laboris consequat veniam. Incididunt fugiat id tempor esse qui eu in duis laboris mollit. Labore occaecat laborum sunt deserunt.\n\nEa tempor eiusmod eiusmod cillum mollit aute dolore dolor qui. Ipsum nisi consectetur mollit dolor labore. Cillum cillum incididunt eiusmod ad dolore sit in veniam labore do adipisicing. Duis aliquip qui qui sunt culpa cillum occaecat. Eiusmod aliqua esse commodo commodo nisi irure nisi. Duis laborum sit Lorem consequat sint incididunt sit. Sint proident laborum sit anim officia irure aute in eu ut fugiat.\n\nQui est qui culpa sunt. Anim mollit commodo magna mollit. Quis dolore ullamco minim ut nostrud veniam ad ea ad proident aute dolor. Dolor id in commodo exercitation nisi labore amet sit laborum aliqua. Consequat velit in dolore adipisicing dolore nostrud Lorem pariatur tempor labore irure laboris.\n\nUllamco laborum aliqua aliqua et veniam sit in nisi proident. Ut consequat sit amet ullamco commodo tempor nulla Lorem esse nisi ea do amet. Duis in mollit commodo fugiat proident mollit. Enim eiusmod fugiat amet voluptate nisi excepteur cupidatat excepteur deserunt enim sit occaecat aliquip dolore. Et veniam quis commodo nostrud est elit. Dolor aliqua laboris tempor magna ullamco tempor aute eiusmod anim aute cillum cillum et occaecat. Minim esse aute id labore ullamco enim magna eiusmod minim ex non nisi id ipsum.</p>",
    summary:
      "Aliquip amet cillum incididunt ut esse consequat aliquip cillum reprehenderit voluptate velit ea et consectetur. Commodo voluptate nulla amet in exercitation amet officia aliqua ullamco nisi. Sunt cillum dolor tempor ipsum est elit in mollit laborum. Minim et laborum occaecat dolore tempor magna in id.",
    docNumber: "37 47 7(g)",
    docType: "form",
    title: "id cupidatat minim culpa consectetur cillum"
  },
  {
    office: {
      title: "Office of do proident",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sun Jun 25 2017 15:25:38 GMT+0000 (UTC)",
        effectiveDate: "Sat Nov 01 2008 05:04:21 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Thu May 11 2017 18:19:33 GMT+0000 (UTC)",
        effectiveDate: "Wed Oct 15 2008 22:00:26 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sat May 06 2017 02:51:29 GMT+0000 (UTC)",
        effectiveDate: "Sat Jan 28 2017 22:28:23 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["7(a)", "CDC"],
    body:
      "<p>Ut Lorem ea enim labore ut occaecat nulla sunt velit tempor proident culpa dolor proident. Deserunt consectetur reprehenderit ea officia ipsum do laboris laboris ad non consequat. Velit culpa ipsum commodo fugiat ad. Nisi amet commodo ipsum deserunt aliquip sint aliquip fugiat elit. Magna eu in enim quis culpa ad commodo.</p><p>Anim sit quis qui dolor nostrud magna irure. Lorem elit esse et pariatur cupidatat nostrud veniam aliqua reprehenderit ad nulla occaecat pariatur minim. Nisi ea deserunt id cupidatat laboris laborum et nisi dolor incididunt duis veniam sit et. Sint est deserunt aliqua excepteur reprehenderit enim elit id in ullamco Lorem ea consequat. Eu velit laboris proident consectetur. Sint sit excepteur cillum dolor fugiat duis ipsum veniam. Nostrud incididunt nostrud aliqua sunt laboris culpa labore consectetur proident ad.\n\nAliqua ut irure pariatur Lorem commodo consectetur eu deserunt commodo. Cupidatat ipsum veniam nostrud aliquip eu nisi ex nostrud nulla aute in non esse laborum. Incididunt elit nulla enim id do laborum amet fugiat cupidatat veniam magna.\n\nEt ea veniam laborum exercitation eu. Dolor esse incididunt in dolore excepteur magna mollit. Nulla in veniam consequat aliquip ea commodo mollit nulla fugiat ullamco do ut aute proident. Ut anim occaecat anim adipisicing dolor dolore qui veniam aliqua occaecat ea fugiat ex deserunt.</p><p>Qui est dolore culpa in adipisicing adipisicing. Enim laborum in tempor dolor ipsum labore consectetur. Cillum irure ullamco dolor minim quis pariatur pariatur exercitation amet. Cillum nulla excepteur cupidatat veniam ipsum aliqua velit in nostrud commodo commodo elit dolor. Cupidatat aliqua sunt ut occaecat sit ipsum.\n\nSunt quis excepteur velit quis mollit sunt incididunt mollit. Cupidatat culpa aute id velit exercitation irure. Lorem velit pariatur nostrud qui est veniam proident fugiat commodo. Cillum minim minim fugiat occaecat non veniam in aute adipisicing veniam.\n\nOccaecat cillum in sint elit. Ad magna ea aliqua ea qui exercitation pariatur sint est velit adipisicing. Elit esse dolor non in cupidatat excepteur nostrud ea. Consectetur in anim ut incididunt duis id id anim. Anim elit consequat sit ipsum. Veniam sit ex ut irure nostrud enim ea eiusmod voluptate dolor. Ea duis occaecat elit quis et qui qui.\n\nNon non velit labore occaecat amet anim dolore velit sint excepteur exercitation irure. Veniam laboris dolor officia magna voluptate Lorem est eiusmod nulla laborum commodo incididunt fugiat magna. Sunt laborum eiusmod proident nulla nulla quis excepteur proident sint sunt. Est proident voluptate aliquip proident pariatur enim incididunt sunt veniam.\n\nSint et magna enim nostrud ea occaecat. Mollit id do eu eu mollit aute aliquip ut pariatur dolore voluptate et. Ut eiusmod voluptate occaecat fugiat et nostrud pariatur. Exercitation anim enim reprehenderit dolore labore cupidatat occaecat do labore eiusmod velit.</p><p>Mollit incididunt ad exercitation id eiusmod incididunt ex elit. Tempor in veniam aliquip laboris mollit duis reprehenderit dolore aliquip irure aute est incididunt. Do excepteur adipisicing incididunt velit cupidatat mollit sunt irure velit. Magna incididunt consectetur reprehenderit do consequat minim nulla et et quis veniam.\n\nCulpa amet magna anim sint officia enim. Incididunt non aute ad ut do enim. Exercitation magna incididunt culpa qui minim proident velit et cupidatat in. Quis ullamco ullamco veniam dolor qui ad officia eiusmod aliqua deserunt ullamco esse velit cupidatat.\n\nCulpa labore duis voluptate proident cupidatat ut deserunt esse excepteur adipisicing. Reprehenderit et voluptate mollit commodo. Ut tempor nisi ipsum est.\n\nCommodo mollit ea quis aliqua nostrud culpa laboris id aliquip proident veniam mollit Lorem in. Laboris consequat ea laboris culpa nisi aute laborum voluptate ullamco. Id mollit fugiat veniam voluptate cillum laboris elit enim aliquip eiusmod magna aliqua labore. Velit laboris mollit do proident exercitation elit voluptate excepteur commodo commodo. Ullamco in laborum ex ex Lorem commodo. Elit ipsum occaecat labore sunt adipisicing pariatur sint incididunt irure sit nisi ut.\n\nPariatur nostrud minim eiusmod cupidatat. Veniam adipisicing ut do excepteur enim ad anim occaecat officia et minim laborum culpa. Duis nisi elit esse proident amet elit culpa commodo. Nostrud fugiat sit sint aute Lorem adipisicing ullamco minim do in pariatur. Aute ex do eu eu aliquip exercitation ut Lorem cupidatat sunt labore enim reprehenderit. Et consectetur reprehenderit exercitation ullamco irure mollit ipsum dolore fugiat elit sit mollit in irure.</p>",
    summary:
      "Mollit in quis amet occaecat adipisicing enim enim aliqua est duis do ea nostrud. Ullamco nostrud exercitation adipisicing est esse mollit anim. Eu anim est aute elit est dolor non. Incididunt in Lorem aute officia quis labore enim. Aliquip magna id commodo adipisicing aute sint cillum. Cillum cillum labore ipsum id excepteur nisi occaecat mollit qui Lorem voluptate.",
    docNumber: "25 37 9(g)",
    docType: "sop",
    title: "et occaecat enim aute labore consequat"
  },
  {
    office: {
      title: "Office of duis fugiat",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sat Apr 01 2017 18:58:37 GMT+0000 (UTC)",
        effectiveDate: "Sun Jul 17 2005 08:41:07 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Thu Jun 08 2017 18:27:19 GMT+0000 (UTC)",
        effectiveDate: "Sun May 03 2009 16:35:02 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Mon Mar 06 2017 13:52:56 GMT+0000 (UTC)",
        effectiveDate: "Thu Mar 01 2001 08:26:41 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["7(a)"],
    body:
      "<p>Cillum adipisicing duis quis Lorem. Dolor aliqua do amet aute aliquip in do fugiat laboris fugiat minim irure consectetur. Id esse irure nisi aute. Mollit aliquip cillum nulla tempor dolor et duis aliqua consequat aute Lorem cupidatat aliquip. Adipisicing consequat ex ut sit do aliquip labore proident consequat aliquip esse exercitation. Laborum occaecat cillum mollit irure dolor duis commodo nulla tempor culpa.</p><p>Reprehenderit ipsum tempor reprehenderit nisi ea esse velit nulla do fugiat ut. Aute dolor fugiat irure id ullamco laborum. Nulla nisi ullamco incididunt voluptate est in duis. Excepteur aliqua fugiat laboris nisi veniam sint reprehenderit. Pariatur cupidatat sunt consectetur adipisicing officia sunt. Magna ad ut Lorem ut pariatur do adipisicing consectetur. Non mollit nostrud mollit proident officia proident do culpa excepteur ipsum laboris.\n\nSint incididunt aliquip aliqua dolor duis consequat excepteur. Est commodo ad fugiat incididunt non aliquip. Elit amet eu voluptate in commodo magna consequat eu in ut do deserunt sit. Id Lorem consequat consequat minim. Irure incididunt cillum occaecat dolore elit elit tempor sit. Labore nostrud do eiusmod exercitation aliquip nisi cillum. Pariatur do mollit incididunt cupidatat anim elit elit irure nostrud esse tempor reprehenderit deserunt minim.\n\nAliquip ex fugiat cupidatat non amet nostrud elit fugiat amet occaecat sint eu amet culpa. Ipsum officia deserunt dolor mollit id eu veniam enim tempor ad. Reprehenderit irure magna consequat ex reprehenderit reprehenderit voluptate consequat consequat anim in fugiat duis velit. Nisi ad consequat occaecat anim deserunt. Mollit duis dolore ut deserunt culpa aliquip voluptate aliqua aliquip cillum.</p><p>Id ut exercitation adipisicing in. Sint do laboris commodo occaecat nostrud id esse esse. Excepteur ut nostrud magna aute aliqua officia consequat id excepteur ex. Adipisicing nisi exercitation adipisicing deserunt Lorem proident. Deserunt deserunt quis ex consectetur proident sit elit consequat. Sunt nisi ipsum est aute reprehenderit non voluptate.\n\nLaborum incididunt amet commodo excepteur dolore cillum ea anim. Officia in aliquip dolor cupidatat cillum duis reprehenderit in. Veniam nostrud amet aute dolor.\n\nExercitation qui officia consectetur id adipisicing anim id labore ea consequat ad fugiat non. Amet aute cillum enim duis eiusmod sint exercitation in adipisicing nostrud quis excepteur. Aliqua laborum voluptate esse quis deserunt consectetur eu elit nostrud velit incididunt consectetur mollit sit. Est officia veniam non veniam ipsum est mollit. Tempor nulla adipisicing ad sit reprehenderit dolor dolor excepteur officia excepteur eu exercitation id sunt.\n\nUllamco ullamco in enim reprehenderit eiusmod ea consequat ea pariatur dolor. Voluptate cillum dolor dolore exercitation irure deserunt do irure ea sint duis est ullamco in. Est exercitation duis commodo excepteur eiusmod irure excepteur reprehenderit Lorem Lorem Lorem cupidatat irure. Ipsum ad proident et aliquip nisi. Tempor tempor occaecat eu ea in sunt voluptate nisi occaecat adipisicing id laboris mollit. Ut labore et ad proident eiusmod consequat. Cupidatat minim labore aliqua pariatur laboris nulla occaecat irure velit sunt consequat adipisicing dolore.\n\nReprehenderit cillum ad pariatur amet cupidatat cillum non. Mollit non non cillum amet sunt et ullamco. Ex dolor amet esse enim ad reprehenderit consectetur dolore aliquip aute ea adipisicing. Deserunt ipsum do irure aliquip tempor reprehenderit incididunt. Consectetur dolor officia exercitation ex ea nisi. Ea minim fugiat ut velit sunt minim sunt nulla sit ad minim velit voluptate.</p><p>In sit proident consequat sit laborum Lorem est proident anim tempor officia deserunt consectetur. Mollit ullamco adipisicing mollit in do adipisicing velit et esse dolore excepteur duis elit. Pariatur labore excepteur incididunt dolor aute. Reprehenderit do qui consequat ipsum ut sint exercitation non elit ea proident.\n\nId do quis excepteur proident in reprehenderit. Labore sint officia ullamco aliqua do nisi in exercitation quis magna occaecat. Proident sit sit anim ullamco voluptate. Sit nisi cupidatat pariatur ea exercitation exercitation ut consequat velit occaecat quis tempor. Proident aliqua sunt sunt quis labore esse cupidatat officia aute non nulla ex est.\n\nDo culpa velit exercitation commodo culpa. Duis proident ullamco sunt qui laboris anim occaecat ipsum eiusmod sunt. Sunt labore eiusmod tempor ex consectetur consequat do ullamco Lorem. Ut esse amet dolore proident. Eiusmod consequat irure occaecat elit do ullamco. Ut eu velit deserunt deserunt veniam do magna magna fugiat nostrud excepteur esse id. Dolor magna sit eiusmod deserunt commodo cillum nulla occaecat excepteur ullamco cillum incididunt consectetur.\n\nEu cillum nostrud laboris proident ea excepteur dolor nulla commodo Lorem irure pariatur. Sint nisi ex dolore fugiat in est non velit duis. Aliqua ut ipsum quis aute velit veniam sunt et sint sunt sint. Enim ad adipisicing occaecat aute eu aliquip fugiat. Voluptate nulla esse id eiusmod culpa ex.\n\nLaboris voluptate reprehenderit aliqua eiusmod sint ex sint duis occaecat sint anim cillum eiusmod ipsum. Laborum laboris pariatur dolor aliquip cillum aliquip velit. Aliqua aute nisi labore labore laborum laboris proident quis cillum dolore mollit pariatur. Consectetur sunt id dolor est. Esse commodo non incididunt excepteur cillum magna et fugiat. Dolore cillum veniam do minim et consequat consectetur irure nostrud incididunt cupidatat ex cupidatat. Aliquip proident adipisicing laborum consectetur consectetur.</p>",
    summary:
      "Sunt ullamco dolore irure cillum fugiat occaecat ad voluptate non occaecat cillum quis labore dolor. Cupidatat excepteur fugiat sint ipsum et. Deserunt aliquip cillum labore tempor id occaecat aute. Minim mollit ex qui officia enim tempor aute esse dolor velit adipisicing nulla non do. Labore laboris duis esse incididunt nisi elit Lorem occaecat ea officia.",
    docNumber: "24 39 6(g)",
    docType: "form",
    title: "in elit sit quis laboris non"
  },
  {
    office: {
      title: "Office of cupidatat magna",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Fri Apr 07 2017 09:08:00 GMT+0000 (UTC)",
        effectiveDate: "Wed Feb 02 2000 02:59:23 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sat Feb 18 2017 11:49:20 GMT+0000 (UTC)",
        effectiveDate: "Sun Feb 01 2015 23:24:37 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Sat Mar 04 2017 17:40:30 GMT+0000 (UTC)",
        effectiveDate: "Sat Sep 22 2001 16:56:54 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["501(c)"],
    body:
      "<p>Sit laborum aliqua laborum Lorem incididunt commodo consectetur cupidatat amet sunt culpa. Elit enim cupidatat non qui Lorem non deserunt officia labore est et eiusmod culpa. Dolore ipsum cillum ipsum Lorem.</p><p>In consequat eiusmod proident nostrud incididunt et dolore do mollit pariatur adipisicing voluptate ea enim. Exercitation culpa amet qui incididunt dolor aliqua officia laboris quis. In qui incididunt eu sit Lorem cupidatat aute ut non qui ut quis. Aliqua commodo cupidatat tempor tempor duis proident sunt enim sunt voluptate eu ut. Laborum Lorem laboris veniam do occaecat adipisicing elit amet.\n\nDo nisi pariatur enim quis voluptate ex quis aliqua. Culpa nostrud nulla nostrud minim nostrud mollit aliquip consectetur velit laborum nostrud do dolor. Dolor elit magna dolore qui nulla.\n\nNisi enim consectetur culpa commodo ipsum mollit fugiat veniam nostrud proident ea occaecat. Minim ut cillum sit nisi pariatur eu consectetur laboris incididunt Lorem voluptate dolor occaecat. Sint non reprehenderit velit officia labore ullamco aliquip eu amet irure. Officia incididunt id qui consectetur cupidatat aute minim consectetur amet tempor aliqua magna id. Qui ex sunt qui eu cillum mollit ex excepteur sint laborum irure eiusmod sit. Labore occaecat consequat exercitation occaecat.</p><p>Nisi deserunt ullamco proident sint ad. Nisi in excepteur sunt pariatur enim anim irure anim eu elit. Tempor anim laboris culpa fugiat incididunt fugiat irure et.\n\nLorem consequat mollit aliqua ipsum cillum irure. Fugiat cillum duis irure voluptate minim duis nisi aliqua. Sint sunt quis dolor consectetur. Laboris incididunt irure quis do sit fugiat sit id laborum deserunt dolor. Pariatur commodo aute duis consectetur duis esse laboris excepteur magna id nulla.\n\nMinim cillum nostrud anim qui. Velit sint esse elit nisi duis occaecat aliquip duis anim. Excepteur proident occaecat elit id laborum cillum nostrud. Proident laborum excepteur sunt aliqua pariatur.\n\nCupidatat id officia culpa excepteur. Voluptate sit consequat adipisicing ea adipisicing non enim exercitation dolor voluptate cupidatat commodo nostrud esse. Non ut irure consequat dolor aliqua consequat non. Elit consequat excepteur tempor duis commodo minim. Id proident duis tempor cillum laboris incididunt. Aliqua qui duis elit enim sit. Velit excepteur ipsum irure sit veniam reprehenderit commodo exercitation sunt amet elit sit voluptate.\n\nQuis nulla quis proident magna culpa ad nulla reprehenderit in ea ex quis adipisicing. Labore sit magna ex cillum do voluptate tempor fugiat elit nulla. Excepteur eiusmod culpa ullamco mollit sint cillum. Officia consectetur nulla cillum duis. Eu reprehenderit eiusmod anim aliqua do irure ad aliqua sit. Proident proident nisi velit ea proident nostrud amet. Ipsum consectetur sint laborum velit laboris reprehenderit nostrud non.</p><p>Aliqua voluptate sunt mollit ea adipisicing est. Elit velit consectetur deserunt nisi magna nostrud do excepteur Lorem commodo dolor labore cillum Lorem. Laboris ipsum laboris elit Lorem eu labore enim exercitation fugiat exercitation sit eu ea elit. Et do enim ut quis esse non do ullamco veniam.\n\nConsectetur id velit proident aliqua excepteur ex. Veniam nisi reprehenderit qui sit incididunt aliqua mollit amet duis laboris ullamco do et anim. Cillum Lorem non dolor aute proident veniam non labore consectetur aliquip fugiat. Commodo sunt laboris ullamco id. Ut sunt amet pariatur do voluptate ex id.\n\nLaborum elit culpa nulla dolor labore consequat. Aliquip fugiat nostrud fugiat non aliqua qui dolor fugiat enim laborum duis. Irure exercitation voluptate magna et minim tempor excepteur laborum minim minim labore. Excepteur ut id deserunt dolore deserunt et consectetur aliqua cillum minim qui Lorem. Tempor mollit esse ut Lorem incididunt ex.\n\nAnim minim occaecat velit est eu reprehenderit pariatur cupidatat irure ut duis eiusmod nostrud proident. Laboris eu dolore ex aute eu aute ea reprehenderit veniam. Esse commodo adipisicing esse sint et excepteur minim aute eiusmod non. Ut culpa elit elit veniam incididunt ea aliquip tempor. Mollit exercitation ex minim laborum mollit labore non nulla culpa officia ex ipsum proident fugiat.\n\nVeniam nisi dolore ad irure dolor excepteur. Ipsum eu eu ea dolor amet pariatur. Commodo nostrud sunt aliquip ad voluptate.</p>",
    summary:
      "Proident ut et qui qui veniam fugiat est quis consequat Lorem Lorem. Et laborum culpa ullamco elit mollit officia veniam cupidatat velit consequat ea cillum mollit velit. Velit occaecat consectetur aliquip nulla ipsum. Commodo exercitation culpa anim exercitation aute culpa. Aliquip qui ea occaecat excepteur do officia laborum.",
    docNumber: "4 48 7(g)",
    docType: "policy notice",
    title: "fugiat duis excepteur pariatur consectetur anim"
  },
  {
    office: {
      title: "Office of et occaecat",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sat Mar 25 2017 04:45:13 GMT+0000 (UTC)",
        effectiveDate: "Sat Sep 16 2000 13:32:52 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Sun Jul 09 2017 13:13:38 GMT+0000 (UTC)",
        effectiveDate: "Thu Oct 18 2012 08:34:45 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Mon Jun 05 2017 08:41:27 GMT+0000 (UTC)",
        effectiveDate: "Fri Jun 26 2015 21:03:41 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["501(c)"],
    body:
      "<p>Eu consequat adipisicing dolor eu tempor cupidatat officia sint. Sint est commodo voluptate nulla duis sint fugiat laborum. Commodo sint nisi aliquip excepteur ad nulla dolore. Qui tempor esse elit pariatur esse amet est occaecat sunt sit anim labore. In ut culpa et ex. Laboris nostrud nostrud consectetur qui sunt nulla mollit irure duis proident ad.</p><p>Enim anim aliqua dolor voluptate commodo veniam sint dolor adipisicing sint ad sunt. Deserunt elit nostrud velit labore reprehenderit proident dolore laboris laboris nostrud ullamco reprehenderit veniam qui. Ea in est sit ad reprehenderit veniam. Officia est occaecat voluptate incididunt consequat reprehenderit.\n\nIpsum laborum irure incididunt exercitation labore nostrud mollit. Cillum exercitation sunt et exercitation commodo minim nostrud eiusmod culpa esse voluptate minim. Sint ullamco veniam non laborum minim eiusmod do ex eu ea. Excepteur ut sint minim sunt velit culpa sunt veniam consequat ullamco excepteur do excepteur deserunt. Sint non ea excepteur irure ea. Velit ullamco ea labore elit labore occaecat id proident voluptate voluptate aliqua dolore dolore. Dolore nostrud magna incididunt ullamco reprehenderit duis irure in labore excepteur sit mollit duis ipsum.\n\nCulpa voluptate eu fugiat tempor reprehenderit amet voluptate nisi proident minim laboris pariatur anim eu. Consectetur proident pariatur esse deserunt quis cupidatat. Mollit exercitation deserunt labore nulla. Veniam elit reprehenderit ex fugiat eu proident. Magna ut consectetur ut culpa laboris enim eu voluptate nostrud culpa tempor ad labore ad.</p><p>Sit id cupidatat minim elit ipsum Lorem eiusmod pariatur eu exercitation non voluptate. Adipisicing exercitation quis laboris anim do proident exercitation officia laborum eu enim officia. Elit veniam deserunt irure dolor ad esse nulla. Ex voluptate labore magna exercitation occaecat velit.\n\nAd pariatur non irure magna do culpa deserunt non quis do. Sit ullamco laborum commodo excepteur eu deserunt minim ex duis velit pariatur. Anim ut enim proident aliqua anim mollit enim ipsum. Occaecat id amet pariatur officia aliquip excepteur in duis sunt amet. Eiusmod ut reprehenderit fugiat veniam. Cupidatat exercitation veniam ullamco aliquip ut non laboris exercitation. Nostrud elit ea aliqua dolor ipsum voluptate anim.\n\nAnim velit ut et est nostrud duis consectetur consequat sit. Amet velit quis cupidatat in nulla duis nisi occaecat aliqua consequat. Velit proident ipsum cillum sit deserunt id mollit consectetur consequat id est ullamco. In esse ad nulla sit laborum minim. Culpa sunt anim nostrud ut minim velit. Sunt incididunt est labore quis duis adipisicing nostrud deserunt proident fugiat excepteur. Sunt dolor duis deserunt adipisicing veniam ea incididunt aliquip.\n\nConsequat dolor culpa laboris consectetur velit amet eiusmod eiusmod occaecat est. Culpa laboris occaecat occaecat ipsum incididunt. Minim in adipisicing eiusmod labore incididunt cillum officia tempor ipsum ullamco excepteur mollit. Pariatur dolor ut nulla laboris nulla laboris velit voluptate tempor amet excepteur veniam amet. Minim exercitation amet culpa irure incididunt. Sunt voluptate ad do non aute culpa aute ea dolore eu esse nulla. Voluptate laborum voluptate dolore dolore tempor voluptate.\n\nIncididunt est ad qui ut reprehenderit non duis duis nulla. Mollit est aute quis cupidatat aliquip officia nostrud adipisicing nulla reprehenderit eiusmod nostrud culpa occaecat. Non sunt duis do fugiat excepteur eiusmod ea eu. Ea ea Lorem dolore labore et nisi. Est minim qui ipsum nulla cillum Lorem veniam commodo duis occaecat minim. Ipsum ipsum officia proident excepteur cupidatat ea reprehenderit ea enim elit cupidatat. Non excepteur anim reprehenderit dolor nulla.</p><p>Id proident eiusmod commodo esse nostrud ad et non aliquip. Elit ea dolore qui do. Labore voluptate eu velit commodo et magna non quis aliqua exercitation nostrud deserunt adipisicing laboris. Nisi duis fugiat ad sint mollit sit laboris irure. Proident duis quis adipisicing Lorem proident adipisicing velit proident aute.\n\nAmet eiusmod est nulla cillum Lorem pariatur. Nisi irure ipsum ea ullamco ex sint. Aliqua proident laboris laborum enim excepteur. Mollit occaecat Lorem quis exercitation eu aliqua exercitation. Ex ullamco dolor ex elit qui sunt ad elit duis eiusmod qui nulla incididunt.\n\nConsectetur ad adipisicing cillum reprehenderit adipisicing. Laborum et incididunt sint quis tempor labore aliquip proident qui. Aliqua duis tempor officia ut consectetur enim laboris magna dolore est qui ut ea. Do aliquip dolore excepteur eu tempor labore culpa quis ut fugiat.\n\nEt irure culpa minim nulla dolor. Do sit labore voluptate nostrud minim pariatur nulla esse. Pariatur excepteur ut nostrud proident nulla deserunt do voluptate esse laboris. Irure aliquip reprehenderit anim exercitation exercitation tempor ea ut minim consequat est dolor tempor id.\n\nReprehenderit adipisicing Lorem eu voluptate laboris aute adipisicing non velit ea id ea. Do sint occaecat enim pariatur fugiat qui cillum ut sint. Laborum consequat eiusmod commodo laboris cillum fugiat magna eu officia non. Fugiat excepteur esse excepteur nisi ea deserunt. Sit mollit aliquip est aliquip deserunt excepteur velit aliquip culpa tempor. Sint dolor in veniam esse ad quis consequat veniam do Lorem veniam proident ullamco do.</p>",
    summary:
      "Magna aliqua anim proident enim. Proident enim ea labore consectetur eiusmod pariatur anim officia. Commodo nostrud esse culpa commodo cillum amet exercitation nostrud occaecat nulla. Velit voluptate laboris consectetur dolore sit est id aute deserunt aliqua esse voluptate sint. Pariatur mollit laboris Lorem consectetur eiusmod sunt est minim pariatur. Tempor qui sit ut duis nostrud et commodo aute ipsum dolore fugiat ea excepteur. Veniam Lorem cupidatat tempor exercitation.",
    docNumber: "41 43 1(g)",
    docType: "policy notice",
    title: "veniam voluptate ea aliqua eu excepteur"
  },
  {
    office: {
      title: "Office of tempor exercitation",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Wed Feb 08 2017 04:01:04 GMT+0000 (UTC)",
        effectiveDate: "Fri May 18 2007 12:31:27 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Mon Jun 12 2017 02:56:14 GMT+0000 (UTC)",
        effectiveDate: "Sat Jun 07 2008 08:40:58 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Thu Jun 01 2017 08:32:49 GMT+0000 (UTC)",
        effectiveDate: "Mon Apr 03 2006 20:22:35 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["8(a)"],
    body:
      "<p>Sit sint ea eiusmod dolore fugiat amet anim id commodo. Ipsum consequat commodo commodo consectetur do ea nostrud do minim et quis. Culpa sunt amet culpa ullamco. Dolore non commodo consequat ullamco eu eu enim nisi laboris deserunt sunt enim nulla elit.</p><p>Mollit ad velit et cupidatat adipisicing anim id laborum ut ex culpa non. Ea qui elit sunt eiusmod nulla occaecat ea ut nisi eu deserunt ipsum nostrud. Aute ad ut in laborum quis consequat cupidatat.\n\nLaborum Lorem aute nostrud dolore commodo ad. Aliquip sunt id amet ipsum anim enim in. Magna cillum qui incididunt irure. Qui irure culpa duis anim ad culpa reprehenderit ex sit consectetur. Proident pariatur nulla labore excepteur voluptate ullamco consequat irure duis non ipsum non.\n\nId tempor ullamco commodo quis reprehenderit. Mollit ullamco sit officia esse sunt. Duis pariatur eu sunt commodo laborum tempor aliquip occaecat irure amet reprehenderit ad culpa cillum.</p><p>Ad labore deserunt deserunt aliquip nostrud sunt culpa est ea Lorem nulla. Eiusmod fugiat do ut Lorem aliqua deserunt aute sunt dolor mollit. Non laboris sint aute quis ullamco cupidatat nisi et labore in consectetur. Excepteur dolore ad excepteur veniam pariatur.\n\nQui eu enim labore veniam dolor laboris minim minim veniam quis aliquip. Cupidatat amet ut Lorem nisi nulla voluptate labore mollit deserunt. Ea voluptate veniam do culpa proident do incididunt amet.\n\nElit velit tempor consequat ut. Fugiat deserunt consectetur adipisicing aliquip officia Lorem velit cupidatat. Cupidatat magna nulla ipsum ullamco amet incididunt aliqua duis ipsum irure consequat eiusmod incididunt ea.\n\nAliquip minim proident adipisicing tempor incididunt enim quis. Consectetur mollit officia laboris veniam ea occaecat exercitation ipsum tempor velit reprehenderit. Commodo id velit deserunt commodo fugiat deserunt ut id et ullamco.\n\nCupidatat do cupidatat labore amet et dolore quis. Aliqua sunt nostrud occaecat sint aliqua aliquip. Aliquip aliquip nulla reprehenderit aliqua elit mollit. Esse culpa non elit culpa eu ut tempor. Cillum officia consectetur quis adipisicing sint laborum qui officia. Est aliqua pariatur eiusmod culpa. Cillum cillum commodo dolore labore esse quis excepteur fugiat est qui ut.</p><p>Aliqua voluptate commodo minim pariatur excepteur tempor laborum ex quis voluptate. Est eiusmod duis eu laborum excepteur id ipsum. Nisi aliquip Lorem cillum velit enim ea consequat ea sunt id do. Exercitation magna duis irure ut irure labore reprehenderit eiusmod commodo Lorem. Incididunt veniam aliqua consequat ea anim laborum mollit ullamco nisi officia.\n\nSunt tempor Lorem anim ex elit culpa ad proident. Sit ipsum in ipsum esse enim occaecat aliquip incididunt proident. Ea esse consequat consectetur fugiat minim voluptate voluptate reprehenderit duis est esse excepteur. Do nulla quis ad fugiat ut cupidatat id. Lorem culpa quis elit elit consequat nisi sit. Veniam occaecat laborum irure aute non pariatur.\n\nExercitation ipsum sunt ut sunt velit et dolor ut qui. Esse cillum est ex consectetur do quis. Mollit non nostrud id aliqua non enim occaecat qui nisi. Amet dolor ex sint proident commodo laboris ipsum duis nostrud enim incididunt. Aliquip do est ea ex tempor exercitation exercitation pariatur adipisicing aute aute.\n\nVeniam ea dolore cillum quis ea in ad aliquip occaecat. Lorem excepteur esse irure tempor irure eu occaecat mollit consequat aute amet commodo qui. Ullamco enim sunt in voluptate. Do enim culpa ex ut. Officia nulla ea aliquip minim sunt irure labore laboris Lorem. Pariatur non ullamco ex non amet deserunt.\n\nReprehenderit veniam ea cillum amet culpa reprehenderit proident. Voluptate cillum labore incididunt cupidatat incididunt Lorem. Culpa reprehenderit sit proident duis aute dolore velit do laborum deserunt magna non exercitation. Nisi reprehenderit incididunt consequat enim mollit excepteur esse irure. Qui culpa id non exercitation Lorem mollit dolore aliquip sint tempor laborum nostrud mollit. Officia nostrud exercitation do velit non.</p>",
    summary:
      "Nulla sit dolore aliqua sint dolor ex reprehenderit sit occaecat do commodo officia id. Anim minim ipsum elit amet do non tempor. Eu labore est nostrud ea ullamco magna pariatur ut sint.",
    docNumber: "46 30 6(g)",
    docType: "form",
    title: "ex in sit elit eiusmod nisi"
  },
  {
    office: {
      title: "Office of proident tempor",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Mon Jun 12 2017 04:37:58 GMT+0000 (UTC)",
        effectiveDate: "Thu May 16 2013 10:32:55 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Thu Jun 15 2017 02:03:12 GMT+0000 (UTC)",
        effectiveDate: "Mon Dec 28 2009 07:08:30 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Wed Jun 28 2017 08:34:32 GMT+0000 (UTC)",
        effectiveDate: "Thu Dec 18 2003 23:54:09 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC"],
    body:
      "<p>Quis qui esse et minim mollit incididunt esse qui veniam. Quis dolor consequat qui sit nisi aliqua ad dolor adipisicing ex laboris aliqua ullamco. Ut ullamco mollit sint culpa esse do. Enim eiusmod duis id do ea in occaecat velit ea voluptate dolore officia.</p><p>Ut reprehenderit ad reprehenderit exercitation aliquip cillum consequat in culpa minim. Ea magna pariatur magna sunt ullamco voluptate. Laboris ex incididunt exercitation enim dolor sint anim officia cillum aliquip fugiat duis commodo magna. Velit ipsum aute eu fugiat est enim tempor. Duis sit dolor qui ad commodo ullamco occaecat nostrud non. Qui quis ipsum sit Lorem.\n\nEa sint sunt et do laboris. Excepteur in do enim cillum non. Veniam eu adipisicing voluptate ea. Laborum veniam deserunt quis aute duis enim. Qui excepteur sint qui ipsum reprehenderit officia ut. Est proident aliqua ex consectetur sunt esse tempor ullamco ex elit. Dolor sunt Lorem cupidatat irure est.\n\nOfficia commodo esse Lorem sit dolor dolore esse cupidatat ut consequat. Lorem ut excepteur aute proident. Aute Lorem nostrud incididunt qui laborum. Nulla quis esse sunt sint. Cupidatat do ea consectetur sit non ex id reprehenderit Lorem ad adipisicing non laboris ad.</p><p>Ad Lorem do est laboris do anim deserunt quis commodo nisi magna. Amet ullamco sint sint minim. Nulla reprehenderit do voluptate do velit labore. Quis qui qui dolore labore aute consectetur amet pariatur. Aliqua eu voluptate aute officia reprehenderit ea aliqua cupidatat ad aliqua proident.\n\nTempor et consequat eu tempor ullamco minim. Mollit aute minim tempor sit officia ullamco quis cillum aliquip qui nulla aute pariatur ex. Nostrud incididunt eu excepteur sunt laborum sit. Commodo consequat Lorem ad incididunt. Cillum aliqua sunt duis veniam nisi incididunt est duis deserunt irure magna sint culpa. Reprehenderit excepteur id culpa velit consectetur.\n\nUllamco ex ad reprehenderit consectetur adipisicing nostrud adipisicing nisi aliquip deserunt. Occaecat non esse esse incididunt ea veniam. Ullamco ea et Lorem amet pariatur. Duis enim id incididunt nulla Lorem.\n\nMagna sit culpa fugiat ullamco tempor. Velit aute amet consectetur deserunt anim fugiat. Excepteur amet sunt sit ex nulla consequat. Pariatur tempor officia deserunt reprehenderit voluptate ut officia esse incididunt qui. Elit sit amet fugiat occaecat deserunt quis. Et minim sunt duis cillum fugiat excepteur occaecat mollit eu nulla sint. Amet excepteur sunt est ut sit in culpa sint cillum laboris ad voluptate labore id.\n\nEt consequat cillum eiusmod laboris anim proident nostrud commodo. Anim labore excepteur qui aliqua duis ullamco commodo dolore non pariatur ipsum aliqua. Laboris qui cupidatat veniam aliqua. Labore consequat voluptate et irure. Adipisicing occaecat qui labore ex aute. Qui dolor cupidatat et pariatur qui nulla. Eu labore reprehenderit tempor nulla anim magna reprehenderit commodo id fugiat in excepteur amet.</p><p>Consectetur id et aute velit ipsum enim reprehenderit. Nulla ad commodo Lorem laboris nostrud cupidatat mollit est elit exercitation laborum culpa reprehenderit nulla. Ad adipisicing culpa officia elit eiusmod laborum id et consequat ex id ea. Eiusmod ea sint ut ex nulla ad veniam incididunt do voluptate ex reprehenderit tempor consequat. Do deserunt do duis eu id sit cillum eiusmod. Pariatur cillum cillum in commodo nostrud aliqua culpa voluptate.\n\nMinim anim commodo dolore consequat quis minim nulla. Nisi incididunt amet velit Lorem excepteur pariatur elit minim. Mollit laborum anim labore cillum irure voluptate. Reprehenderit eiusmod ullamco occaecat dolor pariatur minim in reprehenderit dolor anim.\n\nFugiat incididunt nostrud cillum laboris culpa ullamco quis commodo Lorem exercitation ea. Esse pariatur qui Lorem ipsum mollit ipsum sunt id. Occaecat nisi quis et elit id incididunt qui id sunt adipisicing pariatur irure. Aliqua nisi proident ipsum est do occaecat cupidatat consequat aute duis aliqua anim fugiat consectetur. Ipsum Lorem aute ad voluptate tempor id consequat nulla veniam et labore in minim consectetur. Cillum laborum elit dolore aute do irure dolore consectetur laboris veniam aliqua ex.\n\nCupidatat qui reprehenderit commodo ad dolor adipisicing ex ea qui dolor minim aliqua in. Laboris id qui elit dolore. Deserunt aute in cupidatat et mollit. Exercitation id cupidatat voluptate ea eu incididunt exercitation sint deserunt est.\n\nEsse voluptate fugiat commodo in exercitation fugiat eu ad sint veniam duis do excepteur dolore. Et labore eiusmod consequat sit eu laborum ullamco ullamco amet aliquip elit amet. Ea Lorem cillum minim velit. Ullamco voluptate deserunt consequat quis non tempor quis. Non Lorem est sunt ipsum. Elit dolore anim consequat Lorem anim et eiusmod ut qui et officia. Quis tempor laboris enim deserunt sit aliqua in ullamco anim sit minim veniam esse minim.</p>",
    summary:
      "Est enim reprehenderit ad non ullamco minim mollit eiusmod excepteur voluptate dolor amet. Nostrud quis aliquip pariatur dolore occaecat labore cillum adipisicing excepteur ad anim ea. Exercitation nisi ut irure qui irure magna minim irure ea ea sit quis. Quis laboris do amet Lorem deserunt enim ipsum incididunt amet. Commodo incididunt tempor elit voluptate aliqua ad. Sint eiusmod tempor et est occaecat sint mollit eu ad.",
    docNumber: "32 34 3(g)",
    docType: "policy notice",
    title: "sint dolore cillum in consectetur sit"
  },
  {
    office: {
      title: "Office of laborum eiusmod",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Sat Mar 18 2017 09:03:28 GMT+0000 (UTC)",
        effectiveDate: "Tue Sep 11 2001 02:27:54 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Tue Jul 18 2017 13:49:00 GMT+0000 (UTC)",
        effectiveDate: "Thu Aug 17 2006 06:39:21 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Mon May 29 2017 06:42:34 GMT+0000 (UTC)",
        effectiveDate: "Fri Apr 11 2008 06:04:40 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["501(c)"],
    body:
      "<p>Aliquip aliquip est Lorem ut occaecat ad velit sunt cupidatat magna tempor. Dolor consequat eiusmod quis voluptate id ipsum tempor officia laboris cupidatat quis consequat eu. Ex Lorem pariatur fugiat Lorem anim Lorem in ea. Eu officia nisi reprehenderit reprehenderit nostrud cupidatat veniam proident culpa. Veniam sit sunt deserunt Lorem sunt laboris et irure eiusmod sint. Ut cupidatat ullamco culpa ut fugiat anim exercitation quis.</p><p>Ipsum dolor amet enim commodo. Amet consectetur nostrud nisi nulla. Consectetur proident laboris velit cupidatat aute est reprehenderit consequat deserunt culpa est non. Laboris consectetur irure ea cillum do reprehenderit deserunt. Occaecat magna do ea quis. Deserunt ullamco ut aute consequat id officia non incididunt duis ex.\n\nQuis nulla cupidatat sunt deserunt eu ut. Mollit non minim adipisicing quis. Elit qui commodo quis aliquip elit pariatur. Voluptate laborum ullamco sunt dolore et sunt sunt elit amet cillum dolor adipisicing.\n\nConsectetur velit do est in anim consectetur nulla officia ipsum enim eiusmod. Sint non est dolore aliqua consectetur excepteur. In nostrud est tempor sint aliquip adipisicing. In quis nisi deserunt mollit ex est Lorem ea proident eu labore. Nostrud sit aute ut minim aliquip exercitation.</p><p>Pariatur aute reprehenderit eu magna laborum ut occaecat labore incididunt sunt in sunt. Labore dolore aliquip ex anim. Laboris eiusmod ex amet eu amet. Quis culpa magna aute amet.\n\nIpsum cupidatat officia reprehenderit deserunt velit occaecat. Esse labore veniam do voluptate consectetur. Sunt ex Lorem quis tempor velit culpa nostrud. Eiusmod pariatur excepteur laborum nostrud ad ex. Minim consequat ipsum id sunt.\n\nCommodo deserunt elit excepteur mollit cillum incididunt ex enim veniam aliqua id id pariatur labore. Elit consequat aute amet incididunt Lorem in cillum culpa incididunt esse reprehenderit eiusmod reprehenderit laborum. Esse do minim anim et magna amet adipisicing nostrud tempor irure amet ipsum. Aliquip et amet culpa dolore quis tempor tempor exercitation. Fugiat proident culpa velit aliquip fugiat occaecat quis et ut mollit consectetur. Fugiat laborum in eu veniam in ad amet veniam. Consequat cupidatat consequat in ex.\n\nOccaecat consectetur minim id et. Commodo labore aute ullamco qui duis nulla aliqua laboris. Ex magna quis officia ut.\n\nQuis nisi est ad labore ad fugiat excepteur irure qui eiusmod. Et id labore qui duis est do anim dolore do exercitation. Mollit excepteur cillum deserunt aliquip do proident in. Non culpa proident laborum dolore aliquip ullamco laborum esse laboris ad. Eiusmod sit officia ea officia sint cupidatat magna adipisicing do et excepteur laborum.</p><p>Dolore enim irure do amet veniam eu duis aute do proident nisi occaecat. Exercitation aute sit ipsum qui nulla dolor. Consequat pariatur elit officia consectetur est occaecat qui ullamco consequat eiusmod deserunt dolor quis veniam. Veniam voluptate ad excepteur voluptate id nostrud culpa ad do pariatur quis deserunt anim consequat.\n\nLaborum aliquip dolore incididunt duis ex. Nisi ea consequat proident eiusmod est do pariatur sit. Commodo mollit officia ex veniam et laborum irure qui. Duis nulla incididunt nostrud do incididunt irure officia dolore sunt occaecat ipsum qui consequat ad. Do veniam mollit Lorem ut est fugiat duis duis ex aliquip.\n\nAliquip tempor est aliqua voluptate enim culpa reprehenderit mollit eu mollit nisi cupidatat culpa culpa. Eiusmod et eiusmod ex occaecat. Do ex elit nisi do anim. Nisi adipisicing sunt commodo sunt incididunt consectetur aute voluptate aliqua incididunt proident aliquip.\n\nElit dolore tempor consectetur labore ex labore id est enim. Incididunt irure occaecat enim excepteur nulla. Ut magna cupidatat aliqua in tempor sit. Aute deserunt irure nostrud dolore eiusmod ullamco officia occaecat enim ex labore cillum. Ullamco voluptate do non magna occaecat sint. Commodo ut aliquip proident exercitation nulla do tempor adipisicing ullamco. Cupidatat ut occaecat cupidatat ullamco adipisicing.\n\nAmet enim labore labore ipsum proident velit cillum. Laboris id velit sint incididunt labore duis aute dolore anim aliqua. Exercitation magna non in aute.</p>",
    summary:
      "Consequat duis nisi pariatur tempor ut deserunt proident velit mollit magna ut consequat aliquip. Proident dolor nulla culpa aliqua veniam. Laboris proident id est est nulla mollit do esse eu officia eu cupidatat nulla qui. Aliqua et in non exercitation reprehenderit irure commodo deserunt dolore sit. Ad sunt dolor est eu. Tempor proident dolore aliqua laboris duis exercitation sint aute. Veniam duis incididunt in consectetur nostrud adipisicing id sit qui laborum fugiat.",
    docNumber: "21 25 8(g)",
    docType: "sop",
    title: "et labore ex consequat quis magna"
  },
  {
    office: {
      title: "Office of commodo velit",
      uri: "https://www.sba.gov/offices/headquarters/ooi"
    },
    files: [
      {
        version: 0,
        expirationDate: "Mon Jun 26 2017 05:57:44 GMT+0000 (UTC)",
        effectiveDate: "Thu Jan 22 2009 11:40:02 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 1,
        expirationDate: "Thu Feb 09 2017 06:50:31 GMT+0000 (UTC)",
        effectiveDate: "Tue Apr 26 2011 09:59:35 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      },
      {
        version: 2,
        expirationDate: "Mon Apr 10 2017 19:16:18 GMT+0000 (UTC)",
        effectiveDate: "Thu Jan 17 2008 05:09:21 GMT+0000 (UTC)",
        url: "http://che.org.il/wp-content/uploads/2016/12/pdf-sample.pdf"
      }
    ],
    activity: "Liquidation",
    programs: ["SBIC"],
    body:
      "<p>Anim cupidatat officia proident enim commodo consequat. Excepteur do tempor elit sit reprehenderit esse ipsum nostrud pariatur sunt officia. Labore anim consectetur sunt anim et occaecat Lorem proident ex nulla. Laborum voluptate amet voluptate Lorem incididunt ipsum elit.</p><p>Consectetur velit et ullamco sunt laboris velit in deserunt quis occaecat veniam. Sunt nisi voluptate mollit enim aliqua voluptate non aliquip consequat excepteur occaecat. Deserunt sit voluptate aute nulla elit nisi. Dolore aute irure ex ut ut. Esse velit irure et laborum ut exercitation eiusmod id quis aliqua dolore est ex duis. Enim dolore id nisi labore est non in Lorem duis dolor laboris sunt. Ad culpa cupidatat aliqua consequat incididunt do ipsum reprehenderit labore.\n\nDo nisi ut ea aute nulla dolor in id Lorem sint eiusmod consequat sit reprehenderit. Et reprehenderit deserunt labore sit culpa minim consectetur est est eiusmod. Id laborum cupidatat do consequat minim Lorem est aliqua veniam incididunt id quis eu esse. Ea elit enim aliqua occaecat eu proident amet nisi laborum officia nulla velit aliquip. Et dolor esse minim elit elit.\n\nVeniam aute nostrud laboris mollit. Esse minim enim pariatur dolore excepteur laborum excepteur sint reprehenderit aliqua id. Aliqua voluptate exercitation ullamco occaecat id aliquip pariatur.</p><p>Lorem exercitation nulla adipisicing sit non aliqua qui occaecat cupidatat ullamco aute non sint. Sint exercitation cillum aute quis et tempor nostrud aute. Ut ipsum amet sit reprehenderit minim consectetur consectetur laborum anim eiusmod est sunt. Do mollit qui nulla tempor nostrud adipisicing eu esse. Nulla qui nulla adipisicing proident nostrud sint ex. Et anim sunt occaecat occaecat ipsum esse exercitation sint proident proident officia ad duis.\n\nUllamco ea duis fugiat veniam cupidatat minim proident velit nisi occaecat ut esse sunt. Voluptate nostrud elit consequat aliquip ut aute sint esse et aliqua. Sint amet sit consequat mollit Lorem esse deserunt consectetur eu labore. Anim labore cupidatat nulla occaecat cupidatat aliquip esse elit ut commodo laboris.\n\nLabore sunt deserunt velit commodo nostrud commodo labore elit. Proident amet ut officia laborum minim anim. Duis elit voluptate ad Lorem adipisicing ullamco aute Lorem culpa ea nulla in ipsum qui.\n\nAute eiusmod excepteur qui fugiat do tempor quis amet. In fugiat occaecat nulla sit veniam nisi eiusmod ipsum esse commodo velit proident esse Lorem. Consectetur veniam anim officia officia magna minim officia et exercitation. Ad elit officia aute ut fugiat Lorem mollit laboris non sunt excepteur minim.\n\nEa qui enim aute occaecat do duis et ad adipisicing reprehenderit dolore ex elit. Ullamco eu enim laborum do do exercitation elit mollit pariatur velit. Deserunt dolore consectetur aliqua quis. Do commodo dolore sint elit commodo Lorem id enim consequat et mollit anim aliqua.</p><p>Sunt ullamco non excepteur mollit nostrud veniam. Incididunt incididunt nisi aliqua do proident est duis mollit ea ea. Amet nulla pariatur in id ipsum commodo ad est veniam ea elit laboris. Irure commodo consectetur eu incididunt incididunt ut nulla veniam exercitation. Aliqua incididunt ut qui laboris reprehenderit aliqua ipsum eu quis.\n\nSunt ut sint deserunt labore. Consectetur id ex qui ut et ut ea cupidatat anim. Ea commodo est eu fugiat veniam officia voluptate aliquip amet.\n\nEt veniam Lorem reprehenderit anim. Exercitation nisi sint occaecat cillum pariatur excepteur do. Non deserunt sunt proident cupidatat consectetur sit nisi sint duis ea consequat ipsum elit do. Amet aliquip commodo laborum dolor sunt. Consequat deserunt ad aliquip do ad aliquip incididunt commodo magna irure deserunt.\n\nAmet aliqua pariatur qui tempor sint. Anim incididunt proident fugiat commodo eu Lorem enim enim elit. Velit laborum do fugiat elit dolor. Ullamco veniam excepteur consequat aute eiusmod sunt ut aute ad quis sunt ad dolore adipisicing. Duis laboris cupidatat tempor enim do id. Id eu sunt est in elit est dolore ut commodo. Incididunt sint labore exercitation culpa amet est enim.\n\nIrure reprehenderit qui voluptate sunt labore aliquip aute. Consequat esse dolore nulla ea et proident aliqua. Ex cupidatat consectetur fugiat fugiat magna non eu laboris esse duis eiusmod. Sunt nulla mollit reprehenderit esse voluptate sint. Occaecat officia fugiat aliqua magna aute elit labore minim ullamco. Ullamco duis adipisicing veniam excepteur tempor elit consectetur non eiusmod qui.</p>",
    summary:
      "Pariatur aliquip do adipisicing cupidatat mollit minim est dolore nostrud. Minim labore duis duis non magna voluptate enim. Cupidatat magna sunt veniam commodo aute incididunt Lorem ullamco qui voluptate dolor ex ea cupidatat. Est labore commodo excepteur incididunt incididunt ut pariatur pariatur quis Lorem voluptate nisi anim. Nisi consequat exercitation incididunt et elit ullamco irure duis ex culpa deserunt amet. Commodo nulla labore proident non anim veniam adipisicing irure deserunt nostrud duis est quis.",
    docNumber: "30 29 9(g)",
    docType: "form",
    title: "labore culpa anim exercitation quis pariatur"
  }
];

export default documentData;
