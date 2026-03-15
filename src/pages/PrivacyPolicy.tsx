import { Helmet } from "react-helmet";
import { useRegion } from "@/contexts/RegionContext";

const PrivacyPolicy = () => {
  const { isCentralAsia } = useRegion();

  return (
    <>
    <Helmet>
      <title>
        {isCentralAsia
          ? "Политика конфиденциальности | Businesses Beyond Borders"
          : "Privacy Policy | Businesses Beyond Borders"}
      </title>
      <meta
        name="description"
        content={
          isCentralAsia
            ? "Политика конфиденциальности Businesses Beyond Borders. Узнайте, как мы собираем, используем и защищаем вашу личную информацию."
            : "Privacy policy for Businesses Beyond Borders. Learn how we collect, use, and protect your personal information."
        }
      />
      <link rel="canonical" href="https://businessesbeyondborders.com/privacy" />
      <meta name="robots" content="index, follow" />
    </Helmet>
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isCentralAsia ? "Политика конфиденциальности" : "Privacy Policy"}
          </h1>
          <p className="text-gray-600">
            {isCentralAsia ? "Последнее обновление: " : "Last updated: "}
            {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia
                ? "1. Информация, которую мы собираем"
                : "1. Information We Collect"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "В Businesses Beyond Borders мы собираем информацию, которую вы предоставляете нам напрямую, в частности когда вы:"
                : "At Businesses Beyond Borders, we collect information you provide directly to us, such as when you:"}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {isCentralAsia ? (
                <>
                  <li>Подписываетесь на наши SMS-уведомления</li>
                  <li>Регистрируетесь на нашу рассылку</li>
                  <li>Связываетесь с нами через наш сайт или формы</li>
                  <li>Посещаете наши мероприятия или участвуете в наших программах</li>
                  <li>Подаёте заявку на волонтёрство</li>
                  <li>Делаете пожертвования или участвуете в сборе средств</li>
                </>
              ) : (
                <>
                  <li>Subscribe to our SMS notifications</li>
                  <li>Sign up for our newsletter</li>
                  <li>Contact us through our website or forms</li>
                  <li>Attend our events or participate in our programs</li>
                  <li>Apply for volunteer opportunities</li>
                  <li>Make donations or participate in fundraising activities</li>
                </>
              )}
            </ul>
            <p className="text-gray-700 mt-4">
              {isCentralAsia
                ? "Эта информация может включать ваше имя, адрес электронной почты, номер телефона, почтовый адрес и другие контактные данные."
                : "This information may include your name, email address, phone number, postal address, and other contact information."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia
                ? "2. Как мы используем вашу информацию"
                : "2. How We Use Your Information"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Мы используем собранную информацию для того, чтобы:"
                : "We use the information we collect to:"}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {isCentralAsia ? (
                <>
                  <li>Отправлять вам обновления для доноров и истории успеха</li>
                  <li>Информировать вас о предстоящих мероприятиях и возможностях для волонтёрства</li>
                  <li>Отвечать на ваши запросы и оказывать поддержку</li>
                  <li>Обрабатывать пожертвования и вести учёт доноров</li>
                  <li>Совершенствовать наши программы и услуги</li>
                  <li>Соблюдать правовые и нормативные требования</li>
                </>
              ) : (
                <>
                  <li>Send you donor updates and impact stories</li>
                  <li>Notify you about upcoming events and volunteer opportunities</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Process donations and maintain donor records</li>
                  <li>Improve our programs and services</li>
                  <li>Comply with legal and regulatory requirements</li>
                </>
              )}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "3. SMS-коммуникации" : "3. SMS Communications"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Когда вы соглашаетесь получать от нас SMS-сообщения:"
                : "When you opt in to receive SMS messages from us:"}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {isCentralAsia ? (
                <>
                  <li>Вы соглашаетесь получать автоматические и неавтоматические текстовые сообщения об обновлениях для доноров, историях успеха, напоминаниях о мероприятиях и возможностях для волонтёрства</li>
                  <li>Частота сообщений варьируется, но обычно составляет от 1 до 4 сообщений в месяц</li>
                  <li>Возможна оплата сообщений и передачи данных согласно тарифному плану вашего оператора</li>
                  <li>Ваше согласие не является условием какой-либо покупки или пожертвования</li>
                  <li>Вы можете отписаться в любое время, отправив STOP, END, CANCEL, UNSUBSCRIBE или QUIT</li>
                  <li>Для получения помощи отправьте HELP или свяжитесь с нами по адресу jacken@businessesbeyondborders.com</li>
                </>
              ) : (
                <>
                  <li>You consent to receive automated and non-automated text messages about donor updates, impact stories, event reminders, and volunteer opportunities</li>
                  <li>Message frequency varies but typically ranges from 1-4 messages per month</li>
                  <li>Message and data rates may apply based on your carrier plan</li>
                  <li>Your consent is not required as a condition of any purchase or donation</li>
                  <li>You can opt out at any time by texting STOP, END, CANCEL, UNSUBSCRIBE, or QUIT</li>
                  <li>For help, text HELP or contact us at jacken@businessesbeyondborders.com</li>
                </>
              )}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "4. Передача информации" : "4. Information Sharing"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Мы не продаём, не сдаём в аренду и не передаём вашу личную информацию третьим лицам в их маркетинговых целях. Мы можем передавать вашу информацию только в следующих случаях:"
                : "We do not sell, rent, or share your personal information with third parties for their marketing purposes. We may share your information only in the following circumstances:"}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {isCentralAsia ? (
                <>
                  <li>Поставщикам услуг, которые помогают нам в реализации наших программ и услуг</li>
                  <li>Когда это требуется по закону или для защиты наших прав и безопасности</li>
                  <li>С вашего явного согласия</li>
                  <li>В связи со слиянием, поглощением или продажей активов (с предварительным уведомлением)</li>
                </>
              ) : (
                <>
                  <li>With service providers who assist us in operating our programs and services</li>
                  <li>When required by law or to protect our rights and safety</li>
                  <li>With your explicit consent</li>
                  <li>In connection with a merger, acquisition, or sale of assets (with prior notice)</li>
                </>
              )}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "5. Безопасность данных" : "5. Data Security"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Мы применяем соответствующие технические и организационные меры безопасности для защиты вашей личной информации от несанкционированного доступа, изменения, раскрытия или уничтожения. Однако ни один метод передачи данных через интернет или электронного хранения не является на 100% безопасным."
                : "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "6. Хранение данных" : "6. Data Retention"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Мы храним вашу личную информацию столько, сколько необходимо для достижения целей, изложенных в настоящей Политике конфиденциальности, если только более длительный срок хранения не требуется или не разрешён законом. Когда вы отказываетесь от SMS-коммуникаций, мы удалим ваш номер телефона из наших списков рассылки в разумные сроки."
                : "We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When you opt out of SMS communications, we will remove your phone number from our messaging lists within a reasonable timeframe."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "7. Ваши права" : "7. Your Rights"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia ? "Вы имеете право:" : "You have the right to:"}
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {isCentralAsia ? (
                <>
                  <li>Получать доступ к вашей личной информации и просматривать её</li>
                  <li>Запрашивать исправление неточной информации</li>
                  <li>Запрашивать удаление вашей личной информации (с учётом правовых требований)</li>
                  <li>Отказаться от маркетинговых коммуникаций в любое время</li>
                  <li>Отозвать согласие на SMS-коммуникации, отправив STOP</li>
                </>
              ) : (
                <>
                  <li>Access and review the personal information we have about you</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Request deletion of your personal information (subject to legal requirements)</li>
                  <li>Opt out of marketing communications at any time</li>
                  <li>Withdraw consent for SMS communications by texting STOP</li>
                </>
              )}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibent text-gray-900 mb-4">
              {isCentralAsia ? "8. Конфиденциальность детей" : "8. Children's Privacy"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Наши услуги не предназначены для детей до 13 лет, и мы сознательно не собираем личную информацию от детей до 13 лет. Если мы узнаем, что собрали такую информацию, мы немедленно её удалим."
                : "Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected such information, we will delete it promptly."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "9. Изменения настоящей политики" : "9. Changes to This Policy"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Мы можем периодически обновлять настоящую Политику конфиденциальности. Мы уведомим вас о любых существенных изменениях, опубликовав обновлённую политику на нашем сайте и обновив дату «Последнего обновления». Ваше дальнейшее использование наших услуг после таких изменений означает ваше согласие с обновлённой политикой."
                : "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website and updating the \"Last updated\" date. Your continued use of our services after such changes constitutes your acceptance of the updated policy."}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {isCentralAsia ? "10. Свяжитесь с нами" : "10. Contact Us"}
            </h2>
            <p className="text-gray-700 mb-4">
              {isCentralAsia
                ? "Если у вас есть вопросы о настоящей Политике конфиденциальности или наших практиках конфиденциальности, пожалуйста, свяжитесь с нами:"
                : "If you have any questions about this Privacy Policy or our privacy practices, please contact us:"}
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Businesses Beyond Borders</strong><br />
                Email: jacken@businessesbeyondborders.com<br />
                Phone: (386) 517-1527<br />
                Website: https://businessesbeyondborders.com
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
    </>
  );
};

export default PrivacyPolicy;
