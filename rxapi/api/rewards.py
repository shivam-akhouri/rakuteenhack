from http import client
import pprint
import veryfi

client_id="vrft64OmAVwUByfLb1kvd1l551cTFyAtM6rC5eE"
client_secret="97cHs5Iz8mH4H9ezYeWDf7fhJgL0Joees0HuPTO2r546FKuLStOU61ZyWSECVYNCDuS4mmGCmFELOMGlzlDjfinCWVRUYVyLANVT5bN4nw2TUTLEzH1v2O7JAzmBRUTo"
username="yash.bhootda2020"
api_key="e5399cebd3ce982ab571995e3f26ffd4"

client = veryfi.Client(client_id , client_secret , username , api_key)

categories = ["automoboile" , "health" , "life" , "home"]
json_result = client.process_document("sample1.pdf",categories)

pprint.pprint(json_result['category'])