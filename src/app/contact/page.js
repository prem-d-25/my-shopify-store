const ContactUs = () => {
    return (
      <div className="py-20 flex items-center justify-center bg-gray-50 px-4">
        <div className="space-y-8 max-w-xl w-full">
          {/* Heading */}
          <h1 className="text-4xl text-center text-gray-800 font-extrabold mb-4">
            Contact Information
          </h1>
  
          <h3 className="text-black">
            For queries & assistance, feel free to reach out at our:
          </h3>
  
          {/* Contact Details */}
          <ul className="list-disc pl-5 text-lg text-gray-600">
            <li className="">
              <span className="font-bold mr-2">Mail:</span>
              <span>support@wtflex.in</span>
            </li>
  
            <li className="">
              <span className="font-bold mr-2">Phone:</span>
              <span>+91 9111553117 (12:00pm to 8:00pm)</span>
            </li>
  
            <li className="">
              <span className="font-bold mr-2">Instagram:</span>
              <span>@wtflex.in</span>
            </li>
  
            <li className="">
              <span className="font-bold mr-2">Address:</span>
              <span>5th Floor, Srajan College of Design, Bhugaon Road, Bavdhan, Pune 411021</span>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default ContactUs;
  