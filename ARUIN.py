import json
adults = open('adults_obese.json',encoding='utf-8')
data_adults = json.load(adults)
mel_obese = 0
mel_total = 0
ade_obese = 0
ade_total = 0
brs_obese = 0
brs_total = 0
syd_obese = 0
syd_total = 0
prt_obese = 0
prt_total = 0
hob_obese = 0
hob_total = 0
can_obese = 0
can_total = 0
for data in data_adults['features']:
    data_code = int(data['properties']['lga_code'])
    if data_code ==24600 and data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']!= None:
        mel_obese += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num'])
        mel_total += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num']) / (
                    int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']) / 100)
    if data_code ==40070 and data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']!= None:
        ade_obese += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num'])
        ade_total += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num']) / (
                    int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']) / 100)
    if data_code ==31000 and data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']!= None:
        brs_obese += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num'])
        brs_total += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num']) / (
                    int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']) / 100)
    if data_code ==17200 and data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']!= None:
        syd_obese += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num'])
        syd_total += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num']) / (
                    int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']) / 100)
    if data_code ==57080 and data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']!= None:
        prt_obese += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num'])
        prt_total += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num']) / (
                    int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']) / 100)
    if data_code ==62810 and data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']!= None:
        hob_obese += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num'])
        hob_total += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num']) / (
                    int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']) / 100)
    if data_code ==89399 and data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']!= None:
        can_obese += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num'])
        can_total += int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_num']) / (
                    int(data['properties']['est_ppl_18yrs_plus_obese_2014_15_asr_100']) / 100)
children = open('children_obese.json',encoding='utf-8')
data_children = json.load(children)
for data in data_children['features']:
    data_code_children = int(data['properties']['pha_code'])
    if(data_code_children ==89399):
        print(1)
    if data_code_children ==24600 and data['properties']['est_chld_2_17_yrs_obese_2014_15_num']!=None :
        mel_obese += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num'])
        mel_total += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num']) / (int(data['properties']['est_chld_2_17_yrs_obese_2014_15_asr_100'])/100)
    if data_code_children ==40070 and data['properties']['est_chld_2_17_yrs_obese_2014_15_num']!=None :
        ade_obese += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num'])
        ade_total += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num']) / (int(data['properties']['est_chld_2_17_yrs_obese_2014_15_asr_100'])/100)

    if data_code_children ==31000 and data['properties']['est_chld_2_17_yrs_obese_2014_15_num']!=None :
        brs_obese += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num'])
        brs_total += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num']) / (int(data['properties']['est_chld_2_17_yrs_obese_2014_15_asr_100'])/100)
    if data_code_children ==17200 and data['properties']['est_chld_2_17_yrs_obese_2014_15_num']!=None :
        syd_obese += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num'])
        syd_total += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num']) / (int(data['properties']['est_chld_2_17_yrs_obese_2014_15_asr_100'])/100)
    if data_code_children ==57080 and data['properties']['est_chld_2_17_yrs_obese_2014_15_num']!=None :
        prt_obese += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num'])
        prt_total += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num']) / (int(data['properties']['est_chld_2_17_yrs_obese_2014_15_asr_100'])/100)
    if data_code_children ==62810 and data['properties']['est_chld_2_17_yrs_obese_2014_15_num']!=None :
        hob_obese += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num'])
        hob_total += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num']) / (int(data['properties']['est_chld_2_17_yrs_obese_2014_15_asr_100'])/100)
    if data_code_children ==89399 and data['properties']['est_chld_2_17_yrs_obese_2014_15_num']!=None :
        can_obese += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num'])
        can_total += int(data['properties']['est_chld_2_17_yrs_obese_2014_15_num']) / (int(data['properties']['est_chld_2_17_yrs_obese_2014_15_asr_100'])/100)
mel_percentage = mel_obese/mel_total
print('mel:')
print(mel_percentage)
ade_percentage = ade_obese / ade_total
print('ade:')
print(ade_percentage)
brs_percentage = brs_obese / brs_total
print('brs:')
print(brs_percentage)
syd_percentage = syd_obese / syd_total
print('syd:')
print(syd_percentage)
prt_percentage = prt_obese / prt_total
print('prt:')
print(prt_percentage)
hob_percentage = hob_obese / hob_total
print('hob:')
print(hob_percentage)
can_percentage = can_obese / can_total
print('can:')
print(can_percentage)