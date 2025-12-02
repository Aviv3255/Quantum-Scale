
import React, { useState } from 'react';
import { ExternalLink, Sparkles, Copy, Check, AlertTriangle } from 'lucide-react';

export default function ImageInspiration() {
  const [activeNiche, setActiveNiche] = useState('fashion');
  const [copiedId, setCopiedId] = useState(null); // Renamed from copiedIndex to copiedId

  const niches = [
    { id: 'fashion', name: 'Fashion', emoji: '👗' },
    { id: 'kids', name: 'Kids', emoji: '👶' },
    { id: 'homeDecor', name: 'Home Decor', emoji: '🏠' },
    { id: 'sportwear', name: 'Sportwear', emoji: '⚽' },
    { id: 'beauty', name: 'Beauty', emoji: '💄' }
  ];

  const images = {
    fashion: [
      'https://i.pinimg.com/736x/96/34/d6/9634d6eb6da5d3507c566942c86f1767.jpg',
      'https://i.pinimg.com/736x/b5/07/41/b5074131f220ea813d1bc1cc942f1409.jpg',
      'https://i.pinimg.com/736x/9e/aa/37/9eaa378f6ff05b32f3823a26979ce835.jpg',
      'https://i.pinimg.com/736x/ae/cb/b3/aecbb3776c4b563a751fa5cf90f09896.jpg',
      'https://i.pinimg.com/736x/37/cf/86/37cf865b9a206fc3672ab272907c5768.jpg',
      'https://i.pinimg.com/736x/02/a3/c6/02a3c651da95df5f750ed43d48d276fc.jpg',
      'https://i.pinimg.com/736x/2a/41/c7/2a41c762f5963a6671244a0a4684173e.jpg',
      'https://i.pinimg.com/736x/ff/f5/bb/fff5bb4563c710da85b568e146b04961.jpg',
      'https://i.pinimg.com/736x/15/28/81/15288162f8292b2cfcb8e59027e64526.jpg',
      'https://i.pinimg.com/1200x/c1/80/39/c1803992b5913c8b6e7fb07d9aa4290d.jpg',
      'https://i.pinimg.com/736x/a7/c2/b8/a7c2b8c8a12eea64fd162caebc59d397.jpg',
      'https://i.pinimg.com/736x/5a/1f/a3/5a1fa3333edd80618bb4bc79380d459a.jpg',
      'https://i.pinimg.com/1200x/27/d2/6f/27d26f68d0385fd4610af663571be4f0.jpg',
      'https://i.pinimg.com/736x/ca/94/8c/ca948c59bd8d75fa678a1fd3027f046a.jpg',
      'https://i.pinimg.com/736x/a8/a0/7c/a8a07c2365b318278a90de6dcae46d20.jpg',
      'https://i.pinimg.com/736x/e8/5e/55/e85e555f8abc3114fdb67f8dd07bd35e.jpg',
      'https://i.pinimg.com/1200x/af/1e/96/af1e960a28cf506f1036458b230e90b2.jpg',
      'https://i.pinimg.com/736x/e8/ec/24/e8ec24fe363605ffd6ce04e7b5cd29de.jpg',
      'https://i.pinimg.com/736x/03/c4/42/03c442ba0f84176d5f58b5009890525b.jpg',
      'https://i.pinimg.com/736x/52/0f/cd/520fcd8dae58c640726dcf0f54b5f466.jpg',
      'https://i.pinimg.com/1200x/59/86/86/59868687d1d1da13c764f166701abd9c.jpg',
      'https://i.pinimg.com/736x/c2/92/24/c2922423ed3a544ac4f2072850c67fb4.jpg',
      'https://i.pinimg.com/736x/05/6a/ba/056aba9b2312ed99a57075fa2284890e.jpg',
      'https://i.pinimg.com/736x/c7/1f/9f/c71f9f3d055f2c1876c7e1d3f8f74957.jpg',
      'https://i.pinimg.com/736x/33/86/d4/3386d4986ba9769f4f0dd77947679fc6.jpg',
      'https://i.pinimg.com/736x/fe/71/2a/fe712affd3bde3b3034e0f2c06a28b42.jpg',
      'https://i.pinimg.com/736x/6f/ca/b8/6fcab832df05df9d316afc746ba675ad.jpg',
      'https://i.pinimg.com/736x/07/35/45/073545effdde013315e0d25212fd1970.jpg',
      'https://i.pinimg.com/736x/3e/2c/63/3e2c636199b6aeff3b689c7febd6165b.jpg',
      'https://i.pinimg.com/736x/05/36/7f/05367f534e19245539f9961583b14c53.jpg',
      'https://i.pinimg.com/736x/39/90/60/39906051484fa90c609f56208516e4a8.jpg',
      'https://i.pinimg.com/1200x/6c/5b/ee/6c5beeef696d5813face6c6f16b45b27.jpg',
      'https://i.pinimg.com/736x/b2/27/7b/b2277b6eae1867a678fac9271122f3ba.jpg',
      'https://i.pinimg.com/736x/69/ca/23/69ca23155eb8a2fcc538f81c801a9df2.jpg',
      'https://i.pinimg.com/1200x/e0/85/3c/e0853cabf039edda25577b4b22a789d9.jpg',
      'https://i.pinimg.com/736x/22/64/35/22643551a7ccca116a4e6af03ded35bc.jpg',
      'https://i.pinimg.com/1200x/b1/ff/b4/b1ffb4231d332f6f98dc461f15519ac9.jpg',
      'https://i.pinimg.com/736x/92/39/31/923931d9967a6e8d618545475ef1f175.jpg',
      'https://i.pinimg.com/1200x/dd/64/63/dd6463fb011877d38f5876ea92581339.jpg',
      'https://i.pinimg.com/736x/d1/a3/6c/d1a36ce136f809627a89e0ccd72e3025.jpg',
      'https://i.pinimg.com/1200x/9a/6a/10/9a6a10aa18fe26d05a6be26fe6212a4e.jpg',
      'https://i.pinimg.com/736x/53/25/dd/5325dddcf890c68cb7b91f263afed7a8.jpg',
      'https://i.pinimg.com/736x/dc/2f/58/dc2f58d1d62391a84fdda6e95deef8fe.jpg',
      'https://i.pinimg.com/736x/6e/0f/e0/6e0fe0a73a41eb604e094dc59df24b28.jpg',
      'https://i.pinimg.com/1200x/5a/b7/7b/5ab77bcca44a8f6a4ae5daf887b410e1.jpg',
      'https://i.pinimg.com/1200x/4b/a8/f7/4ba8f7ee97e795a124a8cf5943c62e7e.jpg',
      'https://i.pinimg.com/736x/21/1e/c3/211ec3e262e60899ea768c7767a3961a.jpg',
      'https://i.pinimg.com/736x/09/b4/ae/09b4ae2fd484f2fb847da540934fa2d6.jpg',
      'https://i.pinimg.com/736x/a7/0a/25/a70a25e67b407ad938b509d81c4e093a.jpg',
      'https://i.pinimg.com/736x/27/92/88/27928857ec44451772e412fe0adc142e.jpg',
      'https://i.pinimg.com/1200x/43/35/97/433597b711b51320fe5c5925437ede35.jpg',
      'https://i.pinimg.com/1200x/1e/28/c6/1e28c667ea48ed37ff0df4cf5a487e6b.jpg',
      'https://i.pinimg.com/1200x/fd/be/cc/fdbecc80ba448fdee2a41a62738b90db.jpg',
      'https://i.pinimg.com/736x/99/91/a7/9991a78d0d8ccbcf8226ac238bff50ae.jpg',
      'https://i.pinimg.com/1200x/e8/73/71/e873717b6570d659dc94c685319c4c5e.jpg',
      'https://i.pinimg.com/1200x/54/6d/a3/546da31c59177057c16a94130857e9b6.jpg',
      'https://i.pinimg.com/736x/38/e3/c5/38e3c59d66d89d9f409a79a3dcb1c3f0.jpg',
      'https://i.pinimg.com/1200x/b9/90/39/b99039773d558e7ede20c72d41d1ec53.jpg',
      'https://i.pinimg.com/736x/82/ff/a0/82ffa0198ab02f4b1b714040924e1d94.jpg',
      'https://i.pinimg.com/1200x/49/6e/ae/496eaece25d3ad7e7c92d586a0c34367.jpg',
      'https://i.pinimg.com/736x/9e/f0/80/9ef080128aee6a2fce7c5ac47792bca3.jpg',
      'https://i.pinimg.com/736x/25/5b/74/255b7483fec13e38eb61701a9510faba.jpg',
      'https://i.pinimg.com/736x/7d/f1/1b/7df11b59513901b64e906451bea7c29f.jpg',
      'https://i.pinimg.com/736x/e5/c3/93/e5c39328b5ab8fd5da3f359579eaf54e.jpg',
      'https://i.pinimg.com/736x/81/06/06/810606cc74dd2649097173d01dea9320.jpg',
      'https://i.pinimg.com/736x/e5/54/2a/e5542a0f0e37de9c02d3ab4789c3dd35.jpg',
      'https://i.pinimg.com/736x/59/3c/99/593c994d1e45d69cb7b7d7a0ec3bbff7.jpg',
      'https://i.pinimg.com/736x/0e/bc/87/0ebc87fdd4ed9d9cb6a8d63155d272a0.jpg',
      'https://i.pinimg.com/736x/c2/4d/0e/c24d0eb8eea6a6b1d5f7f8da11908194.jpg',
      'https://i.pinimg.com/1200x/f9/27/d9/f927d9ca71a242080c1e6389c7a99e15.jpg',
      'https://i.pinimg.com/736x/5f/a7/a5/5fa7a5e3aade6a14b3b49929a6a33260.jpg',
      'https://i.pinimg.com/736x/ea/06/9f/ea069f8febd64e6279176f0587d85cdf.jpg',
      'https://i.pinimg.com/736x/c7/c3/5d/c7c35d71f416a49ddf978f67ef8f3532.jpg',
      'https://i.pinimg.com/736x/08/40/c2/0840c28b16fddf3488e8ec1b51cb6189.jpg',
      'https://i.pinimg.com/1200x/4a/7d/74/4a7d74608c3a0c33a6158d7c7bc83f72.jpg',
      'https://i.pinimg.com/736x/4c/a7/9a/4ca79a3eef1f0bc69eadf348326c757d.jpg',
      'https://i.pinimg.com/1200x/ed/43/b2/ed43b2684cd7e6c881817da2a819e757.jpg',
      'https://i.pinimg.com/1200x/bf/61/aa/bf61aa32fe088f9ac110c6c8da8a11d3.jpg',
      'https://i.pinimg.com/736x/ab/6c/c0/ab6cc003c299f9393dbac98a8e05ade3.jpg',
      'https://i.pinimg.com/736x/73/7b/36/737b362883e72bee919399492c28bf55.jpg',
      'https://i.pinimg.com/736x/f5/bf/30/f5bf3021c7541a7667bee5a33b8954fb.jpg',
      'https://i.pinimg.com/736x/f1/c0/4d/f1c04d5404704804ebfb9778317a28d8.jpg',
      'https://i.pinimg.com/736x/4b/e5/c3/4be5c3332408f3bba8ebb8e0efedda59.jpg',
      'https://i.pinimg.com/736x/bb/f9/24/bbf924df5dff41f2d4fe6252255afa95.jpg',
      'https://i.pinimg.com/736x/f9/94/67/f9946721f9a6d5c0fc550ba8ed7ffc84.jpg',
      'https://i.pinimg.com/736x/2f/7e/ec/2f7eec2041372281cd2792889aecd192.jpg',
      'https://i.pinimg.com/1200x/25/d8/1a/25d81a2503d22453aa762e3c4e2a0b1c.jpg',
      'https://i.pinimg.com/1200x/49/ac/57/49ac5788dfe0893d779589c6201a3448.jpg',
      'https://i.pinimg.com/1200x/08/66/7a/08667aa2210b57f33f52d3bbe9fa8109.jpg',
      'https://i.pinimg.com/736x/25/8f/e8/258fe82be5f79e9367820322783f823e.jpg',
      'https://i.pinimg.com/736x/fc/e7/af/fce7afc645d0f63ca3a4ee1f8ad89be1.jpg',
      'https://i.pinimg.com/736x/1b/ec/56/1bec565a1c99ef16534cea2d8bb938ab.jpg',
      'https://i.pinimg.com/736x/bf/a2/23/bfa2236ebbfedecb5678b50655605457.jpg',
      'https://i.pinimg.com/1200x/6b/8f/df/6b8fdf5c34a0414b089ba10a3f7b8b4d.jpg',
      'https://i.pinimg.com/1200x/01/be/14/01be1495d7ef8ee0f779091571b2f78a.jpg',
      'https://i.pinimg.com/736x/d5/f9/cf/d5f9cfe54e41e6dda2cf77987cb75749.jpg',
      'https://i.pinimg.com/1200x/4f/be/d1/4fbed1826b77fec6d38cbd902c83a8b9.jpg',
      'https://i.pinimg.com/736x/d1/49/94/d14994ccd31fd76776dd421413745f09.jpg',
      'https://i.pinimg.com/736x/72/d5/42/72d54231049126e8bf34ff3620599ded.jpg',
      'https://i.pinimg.com/1200x/4a/68/19/4a6819758de530bd456803862ed4b921.jpg',
      'https://i.pinimg.com/736x/36/72/27/3672275fe841433d0a07ca272401e0b0.jpg',
      'https://i.pinimg.com/736x/52/01/af/5201af26e90490abdb2be8eec4d8ad5a.jpg',
      'https://i.pinimg.com/736x/a2/15/20/a215201d3cc77367a8352afb2d6cc5f0.jpg',
      'https://i.pinimg.com/736x/95/b1/dc/95b1dcff548b61d7559e8e0f11876a00.jpg',
      'https://i.pinimg.com/1200x/18/67/d3/1867d3f6c0e77177f4f10a5a34fe9996.jpg',
      'https://i.pinimg.com/1200x/f9/ab/52/f9ab521f39ac0f4622d8071a9653de1e.jpg',
      'https://i.pinimg.com/1200x/d4/df/ed/d4dfed5f05c4ddfbfaa8973700fba889.jpg',
      'https://i.pinimg.com/736x/24/1d/16/241d16908dc223f2ae43d8f9255a7bdf.jpg',
      'https://i.pinimg.com/1200x/02/2c/b9/022cb9c3f7a9076882615ef34c5943da.jpg',
      'https://i.pinimg.com/1200x/d9/73/8c/d9738c30fb8239a9181ab606541a8129.jpg',
      'https://i.pinimg.com/736x/23/e1/d9/23e1d99a1d3437582cae73b8337100bf.jpg',
      'https://i.pinimg.com/1200x/4b/47/df/4b47df9974ec113772f9e1900ad44896.jpg',
      'https://i.pinimg.com/736x/bd/7a/70/bd7a70564ad45b6cb089779eee93c748.jpg',
      'https://i.pinimg.com/736x/4c/02/b9/4c02b96818e7f277c5921623cde46216.jpg',
      'https://i.pinimg.com/736x/98/e1/fe/98e1fe79be6341b53ff0a349226a0b2d.jpg',
      'https://i.pinimg.com/736x/b1/5b/0b/b15b0b2fe7b82d8908df131a0238d85d.jpg',
      'https://i.pinimg.com/1200x/73/50/88/7350883b7a1931f8c920a04562c58e04.jpg',
      'https://i.pinimg.com/1200x/03/c0/5c/03c05cb68ead95052130cd6af0c78c7b.jpg',
      'https://i.pinimg.com/1200x/1c/68/11/1c6811198ab09a15cb1bda8763964f99.jpg',
      'https://i.pinimg.com/1200x/00/1c/6b/001c6be7a775ffad0468ad9f4fa62651.jpg',
      'https://i.pinimg.com/736x/7f/45/d4/7f45d47eb0a06a28996564e6ec5a9ecf.jpg',
      'https://i.pinimg.com/736x/0d/be/6e/0dbe6ecdb0622939b4abe3ffdaf0a9ea.jpg',
      'https://i.pinimg.com/736x/0e/b9/95/0eb9953e3249b11f75779de03e75c619.jpg',
      'https://i.pinimg.com/1200x/f9/66/80/f96680466b8d1f126f72cfbb95dfba86.jpg',
      'https://i.pinimg.com/736x/dc/d6/6b/dcd66b4cd5a37d2efedde4ab894d9911.jpg',
      'https://i.pinimg.com/736x/ce/48/53/ce48535267a446eecb360da32a111a80.jpg',
      'https://i.pinimg.com/1200x/78/c9/28/78c9280b30d4cf4064a25e4f85c83704.jpg',
      'https://i.pinimg.com/1200x/79/62/76/796276ef7069405718ffa774bb03a6dd.jpg',
      'https://i.pinimg.com/1200x/39/7a/b9/397ab9b21b4b8fa15e7cce631eb0a233.jpg',
      'https://i.pinimg.com/736x/9c/36/43/9c364382b333e500f89f8a403cf74b7a.jpg',
      'https://i.pinimg.com/736x/85/c6/c8/85c6c8a04c1244d091aec0f6653bac5e.jpg',
      'https://i.pinimg.com/1200x/d0/f0/cd/d0f0cdef93d3f86fe9f23424a37f9d85.jpg',
      'https://i.pinimg.com/1200x/f4/04/8d/f4048d7d322fea7ddd954e3f40ac363d.jpg',
      'https://i.pinimg.com/1200x/d0/e0/3f/d0e03fb574db878b96bde5964c7cbc11.jpg',
      'https://i.pinimg.com/736x/53/d9/80/53d98034c77c1f9d85016dd9f9850cd3.jpg',
      'https://i.pinimg.com/736x/72/7e/61/727e6143fd0497d0a684d83251ad26de.jpg',
      'https://i.pinimg.com/736x/d6/fe/3e/d6fe3e682c513d7ea4c6016dcf0d65e4.jpg',
      'https://i.pinimg.com/1200x/db/d8/d0/dbd8d0d46b36c0014b906cc30e6df3f2.jpg',
      'https://i.pinimg.com/736x/fa/7e/cf/fa7ecf77c93e97b6a772f05cfe24b091.jpg',
      'https://i.pinimg.com/1200x/83/4e/62/834e62109a99ec33b5aea5daa9c685d1.jpg',
      'https://i.pinimg.com/1200x/ae/ed/09/aeed09279f73b09be460a24ad45e80d8.jpg',
      'https://i.pinimg.com/736x/17/f3/47/17f347acb37af0a6b57316d076ede529.jpg',
      'https://i.pinimg.com/736x/2f/b3/cb/2fb3cb185ad490d75636717cc5824a26.jpg',
      'https://i.pinimg.com/736x/8c/52/f4/8c52f40b46329ffb5b94a06e5991d0d4.jpg',
      'https://i.pinimg.com/1200x/f8/da/26/f8da263f6dc2da6d1cee9385f81b7bbd.jpg',
      'https://i.pinimg.com/736x/78/8a/54/788a54a6807bbf77cfc8d0eed72152d7.jpg',
      'https://i.pinimg.com/736x/a8/a0/e8/a8a0e8242b804df8cdbe47cf2ba0c339.jpg',
      'https://i.pinimg.com/736x/97/0b/8d/970b8daa3e7fb0b5e0fd8e200167a017.jpg',
      'https://i.pinimg.com/1200x/b2/4f/ac/b24fac3cb46c92f23319951cb22cfe1b.jpg',
      'https://i.pinimg.com/736x/67/6b/21/676b21344400b3484b7f74bcc99a0c2c.jpg',
      'https://i.pinimg.com/736x/2d/9d/2f/2d9d2fd1b94d4d8a13faa68b243dcfa9.jpg',
      'https://i.pinimg.com/736x/22/d4/4c/22d44c38e70bfd2a4e2a1d71378d4950.jpg',
      'https://i.pinimg.com/736x/ff/62/d3/ff62d3057b514c7b373f2a08f35ed1d4.jpg',
      'https://i.pinimg.com/1200x/13/46/e7/1346e73b76079ccee23da8ee865fdb39.jpg',
      'https://i.pinimg.com/1200x/9b/b7/d9/9bb7d94fba6d5c15ae0fb4b53ce5bb0b.jpg',
      'https://i.pinimg.com/1200x/e2/4d/8d/e24d8daebf54c198ddbc4589f4677dfe.jpg',
      'https://i.pinimg.com/1200x/f3/a8/65/f3a865bd20f9b806f026fe0a69961288.jpg',
      'https://i.pinimg.com/736x/8b/21/a5/8b21a531302e19f45145617e7542288d.jpg',
      'https://i.pinimg.com/736x/38/ef/4f/38ef4f19273984dfe78a4faf34b37f1c.jpg',
      'https://i.pinimg.com/1200x/f4/f2/77/f4f277bd1abbba01e62166bbd670b4d2.jpg',
      'https://i.pinimg.com/1200x/f4/70/70/f470707d979543b9cea892217e3e1541.jpg',
      'https://i.pinimg.com/1200x/b7/f3/dc/b7f3dce2f7f8833d102e26a2d69bc202.jpg',
      'https://i.pinimg.com/736x/a1/49/b3/a149b3e40461ba1d187efa06db654763.jpg',
      'https://i.pinimg.com/736x/3f/c3/42/3fc3420e67c54043b411c6183b30c073.jpg',
      'https://i.pinimg.com/1200x/ee/7b/70/ee7b70dbb5c3992d3970a16e091bf886.jpg',
      'https://i.pinimg.com/736x/48/bb/f3/48bbf306eef79619d043fb0d4ca10192.jpg',
      'https://i.pinimg.com/1200x/21/1c/97/211c970f21c50be651f0a803c5d5ac79.jpg',
      'https://i.pinimg.com/1200x/5a/a2/fe/5aa2feab11523bf68269fbc0a0a1e7c3.jpg',
      'https://i.pinimg.com/1200x/02/dd/52/02dd52c030a0ee6c8e4aebc5c9e774fe.jpg',
      'https://i.pinimg.com/1200x/30/ac/39/30ac39f0cce3044ecf7bf33345789a6f.jpg',
      'https://i.pinimg.com/1200x/96/b4/eb/96b4eb22f68b9ab4d60e9fafc6606814.jpg'
    ],
    kids: [
      'https://i.pinimg.com/736x/75/d5/92/75d59206719cfec00710435626011a9b.jpg',
      'https://i.pinimg.com/1200x/d4/c1/b8/d4c1b8f422add97a0f3ae73734af308f.jpg',
      'https://i.pinimg.com/1200x/50/43/5a/50435a0b126dad6b082485901afbb2ad.jpg',
      'https://i.pinimg.com/736x/6c/44/07/6c4407981c2bb24a7807cc12824f0779.jpg',
      'https://i.pinimg.com/736x/c2/d6/72/c2d672f83a73f1d71ce9c9690cd4e56d.jpg',
      'https://i.pinimg.com/1200x/4e/93/11/4e931163fd40b9cd6a64a1117eb8f005.jpg',
      'https://i.pinimg.com/736x/1e/7f/e0/1e7fe0fc8e39b31808d4b2a2d770a49a.jpg',
      'https://i.pinimg.com/1200x/06/a3/eb/06a3ebb83d58fffb11d5f0831ed9ba38.jpg',
      'https://i.pinimg.com/736x/55/d0/d3/55d0d3b54478901eecc878fc8ee132df.jpg',
      'https://i.pinimg.com/736x/a9/8d/a7/a98da7c3830730680035f609eb851853.jpg',
      'https://i.pinimg.com/736x/bb/20/79/bb207915b9bc0cf7b89ca51e73af16f5.jpg',
      'https://i.pinimg.com//1200x/1f/a2/03/1fa20344cf853e86afdac3b2093425ca.jpg',
      'https://i.pinimg.com/736x/56/03/34/560334845fe29adb8267ecffddd63ac0.jpg',
      'https://i.pinimg.com/736x/52/c9/d0/52c9d0e56c69d4fbb7429e76df2ea47f.jpg',
      'https://i.pinimg.com/736x/bd/6c/8f/bd6c8f45c1bc760e22359970b3b2e384.jpg',
      'https://i.pinimg.com/736x/94/e2/cc/94e2cc0953cfd054bb543192f3f46ae4.jpg',
      'https://i.pinimg.com/1200x/c8/8e/8b/c88e8b3704a93d19401739e5a380c768.jpg',
      'https://i.pinimg.com/736x/34/b4/3c/34b43c393abcebe490d9306e5b34e043.jpg',
      'https://i.pinimg.com/736x/7c/9d/3f/7c9d3f823e1ba185a169155964f3fec7.jpg',
      'https://i.pinimg.com/736x/b0/49/d5/b049d525e77115da86e18be910a847fa.jpg',
      'https://i.pinimg.com/1200x/6a/c1/f5/6ac1f58d4b163d37b43ef02a3dca1964.jpg',
      'https://i.pinimg.com/736x/20/fc/ca/20fcca984f823e55d0f52349c0cccfeb.jpg',
      'https://i.pinimg.com/736x/8f/1f/4f/8f1f4fba0bd87ccf2b2b201477d51b76.jpg',
      'https://i.pinimg.com/736x/18/70/d5/1870d5f047dfdc7e6a27051c31497fe7.jpg',
      'https://i.pinimg.com/1200x/a7/22/ed/a722ed6ca2a16a2bfabe83798599b5d9.jpg',
      'https://i.pinimg.com/736x/30/92/d6/3092d6042cc5df70baf804efcc1609ae.jpg',
      'https://i.pinimg.com/1200x/82/75/da/8275dac76ee09e50a549eb371d255e2d.jpg',
      'https://i.pinimg.com/736x/56/65/68/566568b65f20effb9a1f1b36f08c7211.jpg',
      'https://i.pinimg.com/1200x/1e/2f/ee/1e2fee0eb31ae25baf9a6dc89b454bbb.jpg',
      'https://i.pinimg.com/736x/29/81/93/298193cfbb6017bf8287ccde6534a45d.jpg',
      'https://i.pinimg.com/1200x/b5/62/36/b5623653ce75854b6759154198372d1d.jpg',
      'https://i.pinimg.com/1200x/46/c2/05/46c205f1b10179958b05c7d38094f2fb.jpg',
      'https://i.pinimg.com/736x/96/61/97/966197f713e4b8c414ea69220e8344a9.jpg',
      'https://i.pinimg.com/736x/cf/35/c5/cf35c53f233450e811e952300a126df5.jpg',
      'https://i.pinimg.com/1200x/cb/6b/60/cb6b608e8ffd029e595a7cdfe86ee4f6.jpg',
      'https://i.pinimg.com/1200x/ce/ee/2d/ceee2d5a704ff9074bc77320efd8636e.jpg',
      'https://i.pinimg.com/1200x/c9/8e/ae/c98eae21aa30beeca008ec722f34b049.jpg',
      'https://i.pinimg.com/736x/1f/45/f2/1f45f2c5f7e0e93d911e21bb5ee02212.jpg',
      'https://i.pinimg.com/1200x/c4/9f/12/c49f121ab8ad8cb0ca250b0d80ad9d35.jpg',
      'https://i.pinimg.com/1200x/e7/10/3f/e7103f071b865124686ba9980161fb5b.jpg',
      'https://i.pinimg.com/736x/ae/32/56/ae32563b02e081cf616438675f526c69.jpg',
      'https://i.pinimg.com/1200x/40/5b/da/405bda02fcf48975a07a66a709e3fb74.jpg',
      'https://i.pinimg.com/1200x/0c/0e/73/0c0e737a7778427c7c156b9c59dc1c9e.jpg',
      'https://i.pinimg.com/736x/55/f9/38/55f9388bd36aa20b6460474a5f170205.jpg',
      'https://i.pinimg.com/1200x/3b/58/84/3b5884f60e9a532acccbc05b90df43e9.jpg',
      'https://i.pinimg.com/1200x/c9/c5/80/c9c580d1e7f5ce4189ffca6b5171e3be.jpg',
      'https://i.pinimg.com/1200x/17/fa/7f/17fa7f159c38c66461f7d75bff572d6e.jpg',
      'https://i.pinimg.com/736x/ca/e4/a2/cae4a278b8fb24f76568fcd4c754345e.jpg',
      'https://i.pinimg.com/736x/53/24/5b/53245b708ab5ab7e2f5db477fefa7fe0.jpg',
      'https://i.pinimg.com/736x/82/c9/a5/82c9a517b074dac354e45fa426c2f9ff.jpg',
      'https://i.pinimg.com/1200x/44/60/95/446095a7d57002401b0e515108fcd976.jpg',
      'https://i.pinimg.com/736x/6d/60/d4/6d60d4add48abaca526b3e9bb2c09283.jpg',
      'https://i.pinimg.com/1200x/c0/6c/8a/c06c8a75b125eed516381bd12ce4d9c1.jpg',
      'https://i.pinimg.com/736x/e8/02/b5/e802b528ff0f23917032418c8af2e4dd.jpg',
      'https://i.pinimg.com/736x/ab/d2/43/abd2430c7aeaa98ac9f0ebcfce220da9.jpg',
      'https://i.pinimg.com/736x/e8/56/f1/e856f178722210075087d36396c8bb0b.jpg',
      'https://i.pinimg.com/736x/89/d1/16/89d11693246f523192e983175d0f1c82.jpg',
      'https://i.pinimg.com/1200x/71/86/e7/7186e7f1d00930cbd644a2593869afe9.jpg',
      'https://i.pinimg.com/1200x/39/91/ba/3991ba95c19f512460e33d13cd07cc9c.jpg',
      'https://i.pinimg.com/1200x/4e/7c/a5/4e7ca54c2745da9b44821a7af4a198d2.jpg',
      'https://i.pinimg.com/736x/af/52/d4/af52d44c62da6897150368d9ca7ffd8b.jpg',
      'https://i.pinimg.com/736x/3c/1d/28/3c1d28b5ea6ec86b86ed3c69658426ad.jpg',
      'https://i.pinimg.com/736x/9f/87/cf/9f87cf52f26c4192548e20d6b9631d75.jpg',
      'https://i.pinimg.com/1200x/b6/68/b3/b668b385d6874530cd50c9ce300d809f.jpg',
      'https://i.pinimg.com/1200x/15/08/4c/15084ccb3a64186df70dcc318c97e706.jpg',
      'https://i.pinimg.com/736x/3e/a9/60/3ea9607179248d8eab1ef166f047c49b.jpg',
      'https://i.pinimg.com/736x/fc/b0/a7/fcb0a7cb256a6143d32193f592a06cb6.jpg',
      'https://i.pinimg.com/736x/b5/9d/1c/b59d1c80aed313859cb54076a64f936c.jpg',
      'https://i.pinimg.com/1200x/d1/09/c5/d109c561406d202900dc173dc7f7b3b1.jpg',
      'https://i.pinimg.com/736x/c7/b4/56/c7b4564e2618dbe72bc854a4e6c685d9.jpg',
      'https://i.pinimg.com/736x/34/80/5e/34805e06b7266dd0df5093e92a21eb10.jpg',
      'https://i.pinimg.com/736x/92/ed/0f/92ed0f352ca3f75f710b865379750037.jpg',
      'https://i.pinimg.com/1200x/ac/7a/54/ac7a5407ddc8ad58cefd0013ed7b9f08.jpg',
      'https://i.pinimg.com/736x/2d/36/29/2d36290f472576e655538d9044bfa447.jpg'
    ],
    homeDecor: [
      'https://i.pinimg.com/736x/47/81/9b/47819bb9253855136a98f620ab71e4eb.jpg',
      'https://i.pinimg.com/736x/98/18/99/9818994c9fba908dfc491c3bd043d743.jpg',
      'https://i.pinimg.com/736x/f5/6d/2f/f56d2fc27a9be18ed1238d3614d97370.jpg',
      'https://i.pinimg.com/1200x/b9/82/38/b98238f2f77ba463bc4801ad061b27fe.jpg',
      'https://i.pinimg.com/736x/56/6c/b8/566cb89ba04c9ad2f327a9b042d68dfc.jpg',
      'https://i.pinimg.com/1200x/56/c7/cd/56c7cd4e65ef1ac469975f7b2ad257ca.jpg',
      'https://i.pinimg.com/736x/0a/71/a2/0a71a2759661213e3d54e3cbfc734255.jpg',
      'https://i.pinimg.com/1200x/09/91/e6/0991e6cbbaf3a1c4f28085415586c305.jpg',
      'https://i.pinimg.com/1200x/f9/be/38/f9be381caeb482fd5827a13a2fbf4b46.jpg',
      'https://i.pinimg.com/1200x/68/4c/e0/684ce072533b261971ca55bd01f85e51.jpg',
      'https://i.pinimg.com/1200x/6f/76/f2/6f76f2c1f2d70d78b2c3e6b220b0da6c.jpg',
      'https://i.pinimg.com/1200x/33/b6/4a/33b64a13e42113d612a9dc78d575550b.jpg',
      'https://i.pinimg.com/736x/fd/06/ae/fd06ae3e8edf3953ca3d35eb3f3f081e.jpg',
      'https://i.pinimg.com/1200x/36/eb/e2/36ebe2df6da4c95a8b188ed1f60d081f.jpg',
      'https://i.pinimg.com/736x/ea/34/44/ea344464902bd124f1c4f32574c10cfe.jpg',
      'https://i.pinimg.com/1200x/b9/5e/6c/b95e6c38b010ed90876ae87b32b808c9.jpg',
      'https://i.pinimg.com/1200x/c2/41/22/c241229a47fd4037e4cad461dd5739c7.jpg',
      'https://i.pinimg.com/736x/9f/69/38/9f693847c807e9a8a6f167ca54e45217.jpg',
      'https://i.pinimg.com/1200x/b6/1e/6e/b61e6e0d1e6c8ddff16a6af3e7b862fc.jpg',
      'https://i.pinimg.com/1200x/af/f8/57/aff85715c46d9b3272e9f2653bdec0f1.jpg',
      'https://i.pinimg.com/1200x/9b/81/6a/9b816aabf1911f56e3ffaa7f82a2f125.jpg',
      'https://i.pinimg.com/736x/d3/8d/68/d38d6897c167218f27f9b8709ff4399f.jpg',
      'https://i.pinimg.com/736x/59/dc/8d/59dc8d5b8633bdd24c899db6ffdcb8c3.jpg',
      'https://i.pinimg.com/1200x/cd/0c/38/cd0c38b3dfd0133642c44012b4860ac0.jpg',
      'https://i.pinimg.com/736x/45/3a/0b/453a0b13b40f06b77f4b0cf67fff6b4a.jpg',
      'https://i.pinimg.com/736x/9c/7a/63/9c7a631404dcfd0be3b197093524004f.jpg',
      'https://i.pinimg.com/1200x/94/50/0e/94500ed5fd6526dda00fbfb5f4ceb648.jpg',
      'https://i.pinimg.com/736x/37/7e/e4/377ee4c39e14546e40980cdaafc8f4b6.jpg',
      'https://i.pinimg.com/736x/55/d8/a0/55d8a0e36ba84bda565bb44af6970fa6.jpg',
      'https://i.pinimg.com/1200x/92/2f/32/922f32d1f32e174c36e19c2197af2a4a.jpg',
      'https://i.pinimg.com/736x/e8/6e/90/e86e90a8e058fe43ef9bc26758cf91af.jpg',
      'https://i.pinimg.com/736x/3f/42/59/3f4259af743f3235efdbff868879837b.jpg',
      'https://i.pinimg.com/736x/35/b5/5f/35b55f98545f33024fc1b6c971d89158.jpg',
      'https://i.pinimg.com/736x/c4/e0/75/c4e075d3419ad9908fa3712afdf2280d.jpg',
      'https://i.pinimg.com/736x/00/83/15/0083150e9ce38d9f1656f036743eb7b1.jpg',
      'https://i.pinimg.com/736x/ea/08/39/ea0839c4f33fda243f5f95137b39134d.jpg',
      'https://i.pinimg.com/736x/ce/70/e5/ce70e54c62b5afc5db6720dc6486059f.jpg',
      'https://i.pinimg.com/736x/12/a7/4b/12a74bc97912fab4da882487b500b952.jpg',
      'https://i.pinimg.com/1200x/e5/7f/51/e57f518e43a3b1ba75f914fddecacdea.jpg',
      'https://i.pinimg.com/1200x/7e/a1/2f/7ea12f1a4b54718a4a9931a50e2ded81.jpg',
      'https://i.pinimg.com/1200x/7c/eb/58/7ceb58898d9a77f8ebcd5df0f4e958d9.jpg',
      'https://i.pinimg.com/736x/9d/aa/be/9daabe9d3484bb12a78bc648c1548a0d.jpg',
      'https://i.pinimg.com/1200x/ce/38/06/ce38061ed6b71f96601d50a0c8736c74.jpg',
      'https://i.pinimg.com/1200x/87/15/11/8715113de4a826459f93e0245225467f.jpg',
      'https://i.pinimg.com/1200x/3d/49/1e/3d491e71a5495eb23ba4100e2aa37b5d.jpg'
    ],
    sportwear: [
      'https://i.pinimg.com/1200x/e1/ef/2d/e1ef2dabe9d2ef09807cabfb34f0e6bb.jpg',
      'https://i.pinimg.com/1200x/2d/f1/74/2df174c21bbc8db6cd5ce2d0b96b810e.jpg',
      'https://i.pinimg.com/1200x/14/76/58/1476586b948e8724bf2d706daeaf302d.jpg',
      'https://i.pinimg.com/1200x/c5/67/b1/c567b12eb152eb3c919bb08db4db9911.jpg',
      'https://i.pinimg.com/1200x/ba/9a/61/ba9a61d1c5d154798acda66de7ff404c.jpg',
      'https://i.pinimg.com/1200x/5f/30/78/5f30786f14028a0acc4fda573aa193a9.jpg',
      'https://i.pinimg.com/1200x/e1/aa/b7/e1aab79b7f7b40ac66c30daa54dfd382.jpg',
      'https://i.pinimg.com/1200x/97/fc/5c/97fc5cf66f9d6756e90ef6fdc07895ab.jpg',
      'https://i.pinimg.com/736x/bb/0f/cf/bb0fcf06776bfd80867f308e6c15f547.jpg',
      'https://i.pinimg.com/736x/ba/e4/34/bae43408a64df1639e0b8414e2720c41.jpg',
      'https://i.pinimg.com/736x/dc/e7/f7/dce7f7cfc25410af6dac67c2b6b7523b.jpg',
      'https://i.pinimg.com/1200x/08/37/1b/08371b769351723a549368f9ea81842e.jpg',
      'https://i.pinimg.com/1200x/27/ea/b6/27eab6c4e116ab165ab7040475efa1f6.jpg',
      'https://i.pinimg.com/1200x/d5/07/21/d50721f3736b63a0cef295a865177876.jpg',
      'https://i.pinimg.com/736x/9a/28/10/9a2810ce61bc880f804c250af37e15d6.jpg',
      'https://i.pinimg.com/1200x/22/84/35/228435ad484ab230f3098fe4ab44e8e5.jpg',
      'https://i.pinimg.com/736x/06/b1/12/06b11296e1e4c1be6d7fd38abad6c52b.jpg',
      'https://i.pinimg.com/736x/32/a3/ab/32a3ab87f3177c36448fc78e43476d04.jpg',
      'https://i.pinimg.com/736x/df/60/a3/df60a320e6dc29112f67de91f80302c5.jpg',
      'https://i.pinimg.com/736x/a9/4a/d2/a94ad2e27134f358f2b5d66514b69287.jpg',
      'https://i.pinimg.com/736x/d3/3c/e1/d33ce18a61ae6bbcdd53f1660a944a72.jpg',
      'https://i.pinimg.com/1200x/52/47/82/52478292e82837b4478d2b2226f8e909.jpg',
      'https://i.pinimg.com/736x/d1/69/4a/d1694ad4dbfff753323c02c613540373.jpg',
      'https://i.pinimg.com/736x/a5/24/ca/a524ca704e3731682d0c1a1bd6dfc508.jpg',
      'https://i.pinimg.com/1200x/08/36/24/0836244714da937bf9b10e9cad1d94fc.jpg',
      'https://i.pinimg.com/1200x/8e/ea/50/8eea50834895a392c4944977f8cf85f0.jpg',
      'https://i.pinimg.com/1200x/e9/3c/da/e93cda92d42e240bc2e845b5e8284905.jpg',
      'https://i.pinimg.com/1200x/93/cd/e8/93cde818459fbb4eefeb3e4e9974356c.jpg',
      'https://i.pinimg.com/736x/c1/d3/83/c1d38342eacca746fd34fe9f7aac1b64.jpg',
      'https://i.pinimg.com/736x/f9/59/94/f95994b44e7b8e33aec015ea0f6782e5.jpg',
      'https://i.pinimg.com/1200x/51/ee/23/51ee237baa9e56f02fb0e57f2b45f132.jpg',
      'https://i.pinimg.com/736x/a3/40/a2/a340a25c05bd2c4cf5f5b62cbabae7ae.jpg',
      'https://i.pinimg.com/1200x/f3/10/90/f3109065ab1b426c7c30023a363c2424.jpg',
      'https://i.pinimg.com/1200x/e4/8a/c0/e48ac0fb630c4273c8b1f034ce9f7fe0.jpg',
      'https://i.pinimg.com/1200x/06/57/0a/06570a4f51b3b72ac1607d93ea5efec4.jpg',
      'https://i.pinimg.com/1200x/f8/97/77/f89777f546a9255e867cb0b7ae98c9c0.jpg',
      'https://i.pinimg.com/1200x/42/ca/eb/42caeb53f9351f4f5a9b6e11187fc08a.jpg',
      'https://i.pinimg.com/736x/90/df/48/90df483536f183bc07d4cc0b6b105c86.jpg',
      'https://i.pinimg.com/736x/e3/08/c3/e308c3947f1d36f4b0c1fe4b740a1b33.jpg',
      'https://i.pinimg.com/1200x/3a/f1/49/3af1499dce6cac4f2d02c71af4ee2d2a.jpg',
      'https://i.pinimg.com/1200x/a7/f8/64/a7f86466b0170e67133223f25d8243dd.jpg',
      'https://i.pinimg.com/1200x/fa/0f/b7/fa0fb729774748aeb31a10ed18045d16.jpg',
      'https://i.pinimg.com/1200x/f5/44/21/f54421c423047e8857564e936359fc31.jpg',
      'https://i.pinimg.com/736x/82/17/ae/8217ae011b6a60a7c5d091eff628e72d.jpg',
      'https://i.pinimg.com/736x/7d/c4/e0/7dc4e0300aa890dd9bb4ad3bf83d597b.jpg',
      'https://i.pinimg.com/736x/1f/4b/5f/1f4b5f593c67b1703a31ca93034e0bb5.jpg',
      'https://i.pinimg.com/736x/79/58/23/7958238b9f5fbf82200dc716a55bed31.jpg',
      'https://i.pinimg.com/1200x/67/cc/71/67cc712dc4b970647908cef6ef1ce5e6.jpg',
      'https://i.pinimg.com/736x/95/f7/ca/95f7ca555a0ab78c3fe9bbc54f1a4035.jpg',
      'https://i.pinimg.com/1200x/72/55/1e/72551e0f0bcef943a799f238f7a00c53.jpg',
      'https://i.pinimg.com/1200x/73/40/dd/7340dd20263f189d8016a756fe0bd38b.jpg',
      'https://i.pinimg.com/1200x/65/81/ba/6581babb13de55f35cfd3a938af3075a.jpg'
    ],
    beauty: [
      'https://i.pinimg.com/736x/e4/4a/3e/e44a3e48e72e61345ae0d050eb900a16.jpg',
      'https://i.pinimg.com/736x/76/6e/bd/766ebd5734ea5d2110bf08bda5180a39.jpg',
      'https://i.pinimg.com/736x/f5/a8/f4/f5a8f4f570a022dbd25793cccf08d899.jpg',
      'https://i.pinimg.com/736x/6d/01/34/6d0134316bb4afeb24197a776283e020.jpg',
      'https://i.pinimg.com/736x/79/b0/b8/79b0b8e2b6c48ef389a313562560eb89.jpg',
      'https://i.pinimg.com/736x/9f/80/f6/9f80f693697217e02bdada230b68a686.jpg',
      'https://i.pinimg.com/1200x/0b/b2/9e/0bb29ed54c5e9b04f43f260eafee4765.jpg',
      'https://i.pinimg.com/736x/b2/02/42/b2024260c1edcc52e46ea858bad58aac.jpg',
      'https://i.pinimg.com/1200x/f6/a7/3d/f6a73d46b17fdbcd8f7efef4b04a3dfd.jpg',
      'https://i.pinimg.com/1200x/5f/d2/49/5fd2495f7665914ea19a24eaf0c323a4.jpg',
      'https://i.pinimg.com/736x/1d/01/af/1d01af48f199c5f75e33abd8b161d56b.jpg',
      'https://i.pinimg.com/1200x/ad/30/52/ad3052dba806447e446b5722a37f4b6a.jpg',
      'https://i.pinimg.com/1200x/4c/5a/17/4c5a179600244250d4c7ef09c4633dbe.jpg',
      'https://i.pinimg.com/1200x/69/e1/e8/69e1e8538d53d0a3acaa350afd3ea334.jpg',
      'https://i.pinimg.com/736x/0d/da/8f/0dda8f159cf6379d846c14f8745b5c79.jpg',
      'https://i.pinimg.com/736x/64/9a/22/649a2288ab5ffd55629f25fe3eeba31e.jpg',
      'https://i.pinimg.com/1200x/52/9d/ce/529dcef9fb09292f0de374c9a2e9b9e7.jpg',
      'https://i.pinimg.com/1200x/b4/45/23/b44523eec6e0549bc6ad68c6e165ede8.jpg',
      'https://i.pinimg.com/736x/03/01/39/03013933c83fa253b438a41da55c67b1.jpg',
      'https://i.pinimg.com/736x/2b/51/85/2b518563b71399ab283e3839c9665646.jpg',
      'https://i.pinimg.com/736x/1e/11/3b/1e113b2e547a827b7a95f71e57599dae.jpg',
      'https://i.pinimg.com/1200x/84/c7/a2/84c7a2b825f5ab53b5af541a252d51a2.jpg',
      'https://i.pinimg.com/736x/2a/35/fe/2a35fe668961be10e404966c0e3bab79.jpg',
      'https://i.pinimg.com/1200x/1f/d6/fd/1fd6fdc65b94d569af7c887d718ec54e.jpg',
      'https://i.pinimg.com/1200x/9a/0f/7a/9a0f7a48431ee9e4f497f68b652e25e7.jpg',
      'https://i.pinimg.com/736x/7a/8d/68/7a8d68a6ab7ebe4d30e546594825b441.jpg',
      'https://i.pinimg.com/736x/4d/14/8d/4d148d589bcc2d03bd23e5fd20d77807.jpg',
      'https://i.pinimg.com/1200x/a7/89/7d/a7897d532cd89f30c7f5bb0deb8ed55a.jpg',
      'https://i.pinimg.com/736x/d4/1b/63/d41b63779cf8a2faf3a893c8cb061f86.jpg',
      'https://i.pinimg.com/1200x/70/8d/e1/708de13234e6bc822dfa3fce592406ed.jpg',
      'https://i.pinimg.com/1200x/53/52/83/535283c27310244d335f0fdc8e65e350.jpg',
      'https://i.pinimg.com/736x/7f/95/69/7f95691a9c6a31031079af29cffd12fe.jpg',
      'https://i.pinimg.com/1200x/73/e5/e8/73e5e854e8ec3ae81a11bb2cfc237ee5.jpg',
      'https://i.pinimg.com/1200x/0a/bb/8b/0abb8bd4fb0ca5cb6e62c6420a47e681.jpg',
      'https://i.pinimg.com/736x/14/cf/dc/14cfdc60e21ce92f3f52c4dad2595096.jpg',
      'https://i.pinimg.com/1200x/0e/b0/f6/0eb0f64f522311757e9ba7acd6758e0a.jpg',
      'https://i.pinimg.com/736x/50/fc/4b/50fc4bc15a559fb094ae6363bd482b46.jpg',
      'https://i.pinimg.com/736x/42/ba/04/42ba041cd86205052590ce0f8c41ff51.jpg',
      'https://i.pinimg.com/1200x/e9/bf/d2/e9bfd23727be42bc7173825685742d0d.jpg',
      'https://i.pinimg.com/736x/1c/4f/5b/1c4f5bbf430da65645944cedc01f9af7.jpg',
      'https://i.pinimg.com/736x/9c/0f/3e/9c0f3e7b6284a5128ffa30fb42671edc.jpg',
      'https://i.pinimg.com/1200x/32/35/8a/32358a12329dab7d08d6290e014d1bc6.jpg',
      'https://i.pinimg.com/736x/15/cd/27/15cd27b0b782779e06eda8ebc327a91c.jpg',
      'https://i.pinimg.com/1200x/8a/a4/bb/8aa4bb3da99bc76fe142588089abead4.jpg',
      'https://i.pinimg.com/1200x/2e/f5/d1/2ef5d1144c0ab7be88da33178f30375d.jpg'
    ]
  };

  const handleCopyImage = async (imageUrl) => {
    try {
      // Create a proxy URL to bypass CORS
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`;
      
      // Try fetching through proxy
      const response = await fetch(proxyUrl);
      const blob = await response.blob();
      
      const img = new Image();
      const imageLoadPromise = new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      
      img.src = URL.createObjectURL(blob);
      await imageLoadPromise;
      
      // Draw to canvas to ensure it's a proper image format
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      
      // Convert canvas to blob
      const finalBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, 'image/png', 1.0);
      });
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': finalBlob
        })
      ]);
      
      // Cleanup
      URL.revokeObjectURL(img.src);
      
      setCopiedId(imageUrl);
      setTimeout(() => setCopiedId(null), 2000);
      
    } catch (err) {
      console.error('Copy failed (first proxy):', err);
      
      // Second attempt: try different proxy
      try {
        const altProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`;
        const response = await fetch(altProxyUrl);
        const blob = await response.blob();
        
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        const finalBlob = await new Promise((resolve) => {
          canvas.toBlob(resolve, 'image/png', 1.0);
        });
        
        await navigator.clipboard.write([
          new ClipboardItem({
            'image/png': finalBlob
          })
        ]);
        
        URL.revokeObjectURL(img.src);
        
        setCopiedId(imageUrl);
        setTimeout(() => setCopiedId(null), 2000);
        
      } catch (secondErr) {
        console.error('Second attempt failed (second proxy):', secondErr);
        alert('לא ניתן להעתיק את התמונה. נסה להוריד אותה ידנית או להשתמש בדפדפן אחר.');
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#F9FAFB' }}>
      <div className="max-w-full mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
               style={{ background: '#F3E8FF', border: '1px solid #E9D5FF' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#8B5CF6' }} />
            <span className="text-sm font-semibold" style={{ color: '#8B5CF6' }}>IMAGE LIBRARY</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ 
            color: '#1E1E1E',
            fontFamily: 'Poppins, sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Image <span style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif', fontWeight: '700', letterSpacing: '0.05em' }}>Inspiration</span>
          </h1>
          
          <p className="text-base md:text-lg leading-relaxed mb-6" style={{ color: '#6B7280' }}>
            A brand destined to be worth a billion dollars must act like a billion-dollar brand, and look like one-from day one. We've curated a library of thousands of visuals that will elevate your brand's appearance to an entirely different level. But remember-this is only 0.7% of what you'll learn in{' '}
            <a
              href="https://quantum-scale.co/products/the-subconscious-switch"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold transition-colors inline-flex items-center gap-1"
              style={{ color: '#3B82F6' }}
            >
              The Subconscious Trap
              <ExternalLink className="w-3 h-3" />
            </a>
            {' '}where you'll discover how to activate your customer's subconscious for uncontrollable impulse purchases-through design.
          </p>

          {/* Important Notice */}
          <div className="p-5 md:p-6 rounded-xl mb-6" style={{
            background: '#FEF3C7',
            border: '1px solid #FDE68A'
          }}>
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
              <h3 className="font-bold text-base md:text-lg" style={{ color: '#D97706' }}>
                Important!
              </h3>
            </div>
            <div className="text-sm md:text-base leading-relaxed space-y-3" style={{ color: '#78350F' }}>
              <p>
                These images are <strong>NOT for commercial use</strong>—they are for inspiration only. If you want to create a similar image in the same style, use ChatGPT with the following prompt:
              </p>
              <div className="p-4 rounded-lg text-sm" style={{
                background: '#FFFBEB',
                borderLeft: '3px solid #F59E0B',
                fontFamily: 'monospace',
                color: '#78350F'
              }}>
                "Create the exact same image for me, but without any text—remove all text or any small branding that appears. Make sure the model's face is not 1:1 identical. Other than that, do everything exactly the same, and keep the image in very high resolution."
              </div>
              <p className="text-xs md:text-sm" style={{ color: '#92400E' }}>
                *For beauty images: Upload your product and tell ChatGPT to replace the product shown in the image with yours.
              </p>
            </div>
          </div>

          {/* Course CTA */}
          <a
            href="https://quantum-scale.co/products/the-subconscious-switch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 group"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(59, 130, 246, 0.15)';
              e.currentTarget.style.borderColor = '#3B82F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
              e.currentTarget.style.borderColor = '#E5E7EB';
            }}
          >
            <Sparkles className="w-5 h-5" style={{ color: '#3B82F6' }} />
            <span className="font-semibold" style={{ color: '#1E1E1E' }}>
              Unlock the Full Power of Design Psychology
            </span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: '#3B82F6' }} />
          </a>
        </div>

        {/* Niche Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {niches.map(niche => (
            <button
              key={niche.id}
              onClick={() => setActiveNiche(niche.id)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm md:text-base transition-all duration-300`}
              style={{
                background: activeNiche === niche.id ? '#EFF6FF' : '#FFFFFF',
                border: activeNiche === niche.id ? '1px solid #3B82F6' : '1px solid #E5E7EB',
                color: activeNiche === niche.id ? '#3B82F6' : '#6B7280',
                boxShadow: activeNiche === niche.id ? '0 2px 8px rgba(59, 130, 246, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.05)'
              }}
            >
              <span className="mr-2">{niche.emoji}</span>
              {niche.name}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
          {images[activeNiche].map((imageUrl, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden mb-2 break-inside-avoid transition-all duration-300"
              style={{
                background: '#FFFFFF',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={imageUrl}
                alt={`Inspiration ${idx + 1}`}
                className="w-full h-auto object-cover rounded-lg"
                style={{ display: 'block' }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

              {/* Copy Button */}
              <button
                onClick={() => handleCopyImage(imageUrl)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                style={{
                  background: copiedId === imageUrl ? '#DCFCE7' : '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                {copiedId === imageUrl ? (
                  <Check className="w-5 h-5" style={{ color: '#16A34A' }} />
                ) : (
                  <Copy className="w-5 h-5" style={{ color: '#3B82F6' }} />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
