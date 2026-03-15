import { Helmet } from "react-helmet";
import { useRegion } from "@/contexts/RegionContext";

const MobileTerms = () => {
  const { isCentralAsia } = useRegion();

  return (
    <>
    <Helmet>
      <title>
        {isCentralAsia
          ? "Мобильные условия использования | Businesses Beyond Borders"
          : "Mobile Terms and Conditions | Businesses Beyond Borders"}
      </title>
      <meta
        name="description"
        content={
          isCentralAsia
            ? "Условия использования SMS-сервиса Businesses Beyond Borders. Ознакомьтесь с нашей политикой мобильных коммуникаций."
            : "SMS messaging terms of service for Businesses Beyond Borders. Review our mobile communications policies."
        }
      />
      <link rel="canonical" href="https://businessesbeyondborders.com/mobile-terms" />
      <meta name="robots" content="index, follow" />
    </Helmet>
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isCentralAsia
              ? "Мобильные условия использования"
              : "Mobile Terms and Conditions"}
          </h1>
          <p className="text-gray-600">
            {isCentralAsia
              ? "Условия использования SMS-сервиса"
              : "SMS Messaging Terms of Service"}
          </p>
          <p className="text-gray-600">
            {isCentralAsia ? "Последнее обновление: " : "Last updated: "}
            {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "1. Описание SMS-программы" : "1. SMS Program Description"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Businesses Beyond Borders предлагает программу SMS-рассылки, чтобы информировать вас о:"
                : "Businesses Beyond Borders offers an SMS messaging program to keep you informed about:"}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {isCentralAsia ? (
                <>
                  <li>Обновлениях для доноров и отчётах о влиянии</li>
                  <li>Вдохновляющих историях успеха из наших программ</li>
                  <li>Напоминаниях о мероприятиях и объявлениях</li>
                  <li>Возможностях для волонтёрства и призывах к действию</li>
                  <li>Важных организационных новостях</li>
                </>
              ) : (
                <>
                  <li>Donor updates and impact reports</li>
                  <li>Inspiring success stories from our programs</li>
                  <li>Event reminders and announcements</li>
                  <li>Volunteer opportunities and calls to action</li>
                  <li>Important organizational updates</li>
                </>
              )}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "2. Согласие и подписка" : "2. Consent and Opt-In"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Предоставив свой номер мобильного телефона и подписавшись на нашу SMS-программу, вы прямо соглашаетесь получать повторяющиеся автоматические и неавтоматические текстовые сообщения от Businesses Beyond Borders. Вы можете подписаться через:"
                : "By providing your mobile phone number and subscribing to our SMS program, you expressly consent to receive recurring automated and non-automated text messages from Businesses Beyond Borders. You can opt in through:"}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {isCentralAsia ? (
                <>
                  <li>Форму на нашем сайте по адресу https://businessesbeyondborders.com/sms</li>
                  <li>Формы при регистрации на мероприятия</li>
                  <li>Отправив JOIN на номер (386) 517-1527</li>
                </>
              ) : (
                <>
                  <li>Our website form at https://businessesbeyondborders.com/sms</li>
                  <li>Event registration and paper forms</li>
                  <li>Texting JOIN to (386) 517-1527</li>
                </>
              )}
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>
                {isCentralAsia ? "Важно: " : "Important: "}
              </strong>
              {isCentralAsia
                ? "Ваше согласие на получение SMS-сообщений не является условием какой-либо покупки, пожертвования или услуги от Businesses Beyond Borders."
                : "Your consent to receive SMS messages is not required as a condition of any purchase, donation, or service from Businesses Beyond Borders."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia
                ? "3. Частота и время отправки сообщений"
                : "3. Message Frequency and Timing"}
            </h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {isCentralAsia ? (
                <>
                  <li><strong>Частота:</strong> Частота сообщений варьируется, обычно от 1 до 4 сообщений в месяц</li>
                  <li><strong>Время:</strong> Сообщения могут отправляться в рабочее время или при необходимости срочного уведомления</li>
                  <li><strong>Содержание:</strong> Сообщения будут связаны с деятельностью нашей некоммерческой организации, сбором средств, возможностями для волонтёрства и обновлениями программ</li>
                </>
              ) : (
                <>
                  <li><strong>Frequency:</strong> Message frequency varies, typically 1-4 messages per month</li>
                  <li><strong>Timing:</strong> Messages may be sent during normal business hours or when urgent communications are necessary</li>
                  <li><strong>Content:</strong> Messages will relate to our nonprofit activities, fundraising efforts, volunteer opportunities, and program updates</li>
                </>
              )}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia
                ? "4. Стоимость сообщений и передачи данных"
                : "4. Message and Data Rates"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Стандартные тарифы на сообщения и передачу данных могут применяться согласно тарифному плану вашего мобильного оператора. Businesses Beyond Borders не взимает плату за SMS-сообщения, однако ваш оператор может взимать плату за отправленные и полученные сообщения. Уточните условия у своего мобильного оператора."
                : "Standard message and data rates may apply based on your mobile carrier's plan. Businesses Beyond Borders does not charge for SMS messages, but your carrier may charge for messages received and sent. Check with your mobile carrier for details about your specific plan."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "5. Поддерживаемые операторы" : "5. Supported Carriers"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Наша SMS-программа поддерживается основными мобильными операторами США. Если у вас возникнут проблемы с получением сообщений, пожалуйста, свяжитесь со своим оператором или обратитесь к нам за помощью."
                : "Our SMS program is supported by major U.S. mobile carriers. If you experience issues receiving messages, please contact your carrier or reach out to us for assistance."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "6. Инструкции по отписке" : "6. Opt-Out Instructions"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Вы можете отказаться от получения SMS-сообщений в любое время, отправив любое из следующих ключевых слов на номер (386) 517-1527:"
                : "You may opt out of receiving SMS messages at any time by texting any of the following keywords to (386) 517-1527:"}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>STOP</li>
              <li>END</li>
              <li>CANCEL</li>
              <li>UNSUBSCRIBE</li>
              <li>QUIT</li>
            </ul>
            <p className="text-gray-700 mt-4">
              {isCentralAsia
                ? "Вы получите подтверждающее сообщение об отписке. После отписки вы больше не будете получать SMS-сообщения от нас, кроме финального подтверждения."
                : "You will receive a confirmation message confirming your opt-out. After opting out, you will no longer receive SMS messages from us, except for a final confirmation message."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "7. Помощь и поддержка" : "7. Help and Support"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Для получения помощи с нашей SMS-программой вы можете:"
                : "For help with our SMS program, you can:"}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {isCentralAsia ? (
                <>
                  <li>Отправить HELP на номер (386) 517-1527 для автоматической помощи</li>
                  <li>Написать нам на почту jacken@businessesbeyondborders.com</li>
                  <li>Позвонить нам по номеру (386) 517-1527</li>
                </>
              ) : (
                <>
                  <li>Text HELP to (386) 517-1527 for automated assistance</li>
                  <li>Email us at jacken@businessesbeyondborders.com</li>
                  <li>Call us at (386) 517-1527</li>
                </>
              )}
            </ul>
            <p className="text-gray-700 mt-4">
              {isCentralAsia
                ? "При отправке HELP вы получите следующий ответ:"
                : "When you text HELP, you will receive the following response:"}
              <br />
              <em>"Businesses Beyond Borders support: jacken@businessesbeyondborders.com • (386) 517-1527 • Msg&data rates may apply."</em>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "8. Приветственное сообщение" : "8. Welcome Message"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "После успешной подписки вы получите приветственное сообщение:"
                : "After successfully opting in, you will receive a welcome message:"}
              <br />
              <em>"BBB: You're in! We'll send donor updates, impact stories & event reminders (1–4/mo). Msg&data rates may apply. Reply STOP to opt out, HELP for help."</em>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia
                ? "9. Конфиденциальность и защита данных"
                : "9. Privacy and Data Protection"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Ваша конфиденциальность важна для нас. Мы не будем продавать, сдавать в аренду или передавать ваш номер мобильного телефона третьим лицам в их маркетинговых целях. Пожалуйста, ознакомьтесь с нашей Политикой конфиденциальности по адресу https://businessesbeyondborders.com/privacy для получения полной информации о том, как мы собираем, используем и защищаем вашу личную информацию."
                : "Your privacy is important to us. We will not sell, rent, or share your mobile phone number with third parties for their marketing purposes. Please review our Privacy Policy at https://businessesbeyondborders.com/privacy for complete information about how we collect, use, and protect your personal information."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "10. Доступность сервиса" : "10. Service Availability"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "SMS-сервис доступен в США и может быть недоступен во всех регионах или у всех операторов. Сервис может быть прерван, задержан или иным образом ограничен по причинам, не зависящим от нас, включая погодные условия, зону покрытия сотовой связи или перегрузку сети."
                : "SMS service is available in the United States and may not be available in all areas or on all carriers. Service may be interrupted, delayed, or otherwise limited by factors beyond our control, including but not limited to weather, cellular coverage, or network congestion."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "11. Запрещённое использование" : "11. Prohibited Uses"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Вы соглашаетесь не использовать нашу SMS-программу для:"
                : "You agree not to use our SMS program to:"}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {isCentralAsia ? (
                <>
                  <li>Отправки спама или нежелательных сообщений</li>
                  <li>Незаконной деятельности</li>
                  <li>Преследования, угроз или оскорбления других людей</li>
                  <li>Распространения ложной или вводящей в заблуждение информации</li>
                  <li>Нарушения применимых законов или нормативных актов</li>
                </>
              ) : (
                <>
                  <li>Send spam or unsolicited messages</li>
                  <li>Engage in illegal activities</li>
                  <li>Harass, threaten, or abuse others</li>
                  <li>Share false or misleading information</li>
                  <li>Violate any applicable laws or regulations</li>
                </>
              )}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia
                ? "12. Изменения и прекращение программы"
                : "12. Program Changes and Termination"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Мы оставляем за собой право изменить или прекратить нашу SMS-программу в любое время с разумным уведомлением. Мы также можем приостановить или прекратить ваше участие в программе, если вы нарушите настоящие условия или будете участвовать в запрещённой деятельности."
                : "We reserve the right to modify or terminate our SMS program at any time with reasonable notice. We may also suspend or terminate your participation in the program if you violate these terms or engage in prohibited activities."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "13. Ограничение ответственности" : "13. Limitation of Liability"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Businesses Beyond Borders не несёт ответственности за задержки или сбои в доставке SMS-сообщений, перебои в работе сети или иные перебои в обслуживании, не зависящие от нас. Пользователи несут ответственность за любые расходы, понесённые через своего мобильного оператора."
                : "Businesses Beyond Borders shall not be liable for delays or failures in SMS message delivery, network outages, or other service interruptions beyond our reasonable control. Users are responsible for any charges incurred through their mobile carrier."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "14. Обновления условий" : "14. Updates to Terms"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Мы можем периодически обновлять настоящие Мобильные условия. Существенные изменения будут сообщаться через нашу SMS-программу или сайт. Ваше дальнейшее участие в SMS-программе после таких изменений означает принятие обновлённых условий."
                : "We may update these Mobile Terms from time to time. Material changes will be communicated through our SMS program or website. Your continued participation in the SMS program after such changes constitutes acceptance of the updated terms."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "15. Контактная информация" : "15. Contact Information"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "По вопросам о настоящих Мобильных условиях или нашей SMS-программе:"
                : "For questions about these Mobile Terms or our SMS program:"}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Businesses Beyond Borders</strong><br />
                Email: jacken@businessesbeyondborders.com<br />
                Phone: (386) 517-1527<br />
                SMS Program: Text HELP to (386) 517-1527<br />
                Website: https://businessesbeyondborders.com
              </p>
            </div>
          </section>

          <div className="bg-blue-50 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              {isCentralAsia ? "Краткая справка" : "Quick Reference"}
            </h3>
            <ul className="text-blue-800 space-y-1">
              {isCentralAsia ? (
                <>
                  <li><strong>Для подписки:</strong> Перейдите на businessesbeyondborders.com/sms или отправьте JOIN на номер (386) 517-1527</li>
                  <li><strong>Для отписки:</strong> Отправьте STOP на номер (386) 517-1527</li>
                  <li><strong>Для помощи:</strong> Отправьте HELP на номер (386) 517-1527 или напишите на jacken@businessesbeyondborders.com</li>
                  <li><strong>Частота сообщений:</strong> 1–4 сообщения в месяц</li>
                </>
              ) : (
                <>
                  <li><strong>To Subscribe:</strong> Visit businessesbeyondborders.com/sms or text JOIN to (386) 517-1527</li>
                  <li><strong>To Unsubscribe:</strong> Text STOP to (386) 517-1527</li>
                  <li><strong>For Help:</strong> Text HELP to (386) 517-1527 or email jacken@businessesbeyondborders.com</li>
                  <li><strong>Message Frequency:</strong> 1-4 messages per month</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default MobileTerms;
