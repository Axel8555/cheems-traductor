const parseText = (text) => {
  let appendM = "aáeéiíoóuú"//['a', 'e', 'i', 'o', 'u']
  let exclude = 
    [
    //[/mb /g, 'bm '], sonido nasal
    [/mc /g, 'dc '], 
    [/md /g, 'dm '], 
    [/mf /g, 'df '], 
    [/mg /g, 'gm '], 
    [/mh /g, 'hm '], 
    [/mj /g, 'jm '], 
    [/mk /g, 'km '], 
    [/ml /g, 'lm '], 
    [/md /g, 'dm '], 
    //[/mp /g, 'pm '], sonido nasal
    [/mq /g, 'qm '], 
    [/mr /g, 'rm '], 
    [/ms /g, 'sm '], 
    [/mt /g, 'tm '], 
    [/mv /g, 'vm '], 
    [/mw /g, 'wm '], 
    [/mx /g, 'xm '], 
    [/my /g, 'ym '], 
    [/mz /g, 'zm '],
    [/guma/g, 'gua'], [/gume/g, 'gue'], [/gumi/g, 'gui'], [/gumo/g, 'guo'], [/gumu/g, 'guu'],
    [/quma/g, 'qua'], [/qume/g, 'que'], [/qumi/g, 'qui'], [/qumo/g, 'quo'], [/qumu/g, 'quu'], 
    [/amam/g, 'aam'], [/amem/g, 'aem'], [/amim/g, 'aim'], [/amom/g, 'aom'], [/amum/g, 'aum'],
    [/emam/g, 'eam'], [/emem/g, 'eem'], [/emim/g, 'eim'], [/emom/g, 'eom'], [/emum/g, 'eum'],
    [/imam/g, 'iam'], [/imem/g, 'iem'], [/imim/g, 'iim'], [/imom/g, 'iom'], [/imum/g, 'ium'],
    [/omam/g, 'oam'], [/omem/g, 'oem'], [/omim/g, 'oim'], [/omom/g, 'oom'], [/omum/g, 'oum'], //comom -> coom error. liverpool -> limvemrpooml
    //[/umam/g, 'uam'], [/umem/g, 'uem'], [/umim/g, 'uim'], [/umom/g, 'uom'], [/umum/g, 'uum']
    ]
  let replace = [] //= [/n/g]
  let textSplit = text.replace(/\\n/g, '\n').split('')

  let res = textSplit
      .map(char => {
              return appendM.indexOf(char) !== -1 ? char+'m' : char
      })
      .join('')
      .split('')

  const removeDuplicate = (char, i) => !((res[i-1] === 'm') && (char === 'm'))

  res = res
      .filter(removeDuplicate)
      .join('')

  replace.forEach(regex => {
      res = res.replace(regex, 'm')
  })
  res = res
      .split('')
      .filter(removeDuplicate)
      .join('')

  exclude.forEach(regex => {
      res = res.replace(regex[0], regex[1])
  })

  return res
}
