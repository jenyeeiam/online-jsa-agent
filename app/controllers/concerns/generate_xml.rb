require 'active_support/concern'

module GenerateXml
  extend ActiveSupport::Concern

  def generate_xml(to, from, text)
    "<TranslateArrayRequest>
      <AppId/>
      <From>#{from}</From>
      <Options>
        <Category xmlns='http://schemas.datacontract.org/2004/07/Microsoft.MT.Web.Service.V2' >general</Category>
        <ContentType xmlns='http://schemas.datacontract.org/2004/07/Microsoft.MT.Web.Service.V2'>text/plain</ContentType>
      </Options>
      <Texts>
        <string xmlns='http://schemas.microsoft.com/2003/10/Serialization/Arrays'>#{text}</string>
      </Texts>
      <To>#{to}</To>
    </TranslateArrayRequest>"
  end
end
