import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Card } from '@/components/ui/card';
import { CloudArrowDownIcon } from '@heroicons/react/24/solid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// type SampleQuestion = {
//   chatbot_id: number;
//   created_at: string;
//   id: number;
//   text: string;
//   updated_at: string;
// };

function WhatsAppConnectModal({
  chatbotId,
  isWhatsAppConnectModalOpen,
  handleWhatsAppConnectModal,
}: {
  chatbotId: number | null;
  isWhatsAppConnectModalOpen: boolean;
  handleWhatsAppConnectModal: () => void;
}) {
  const downloadPDF = () => {
    const input = document.getElementById(
      'chatbot-whats-instructions',
    ) as HTMLElement;
    const fileName = 'download.pdf';
    const padding = 10; // Define your padding in mm

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        // eslint-disable-next-line new-cap
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * padding; // Adjusted width with padding
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width - 30;

        pdf.addImage(imgData, 'PNG', padding, 0, pdfWidth, pdfHeight); // Adjusted x-position with padding
        pdf.save(fileName || 'download.pdf');
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Error generating PDF', err);
      });
  };

  return (
    <div>
      <Dialog
        open={isWhatsAppConnectModalOpen}
        onOpenChange={() => {
          handleWhatsAppConnectModal();
        }}
      >
        <DialogContent className=" flex max-h-[90vh] flex-col overflow-y-auto sm:max-w-[650px]">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl opacity-80">
              Connect with WhatsApp
            </DialogTitle>
          </DialogHeader>

          <div id="chatbot-whats-instructions">
            <div>
              <img
                src="/whats-app-connect-info.png"
                alt="whats app connect info"
                className="h-auto w-full rounded-md"
              />
            </div>
            <div>
              <h2 className="my-4 text-2xl font-bold">
                Step 1: Connect to WhatsApp
              </h2>
              <ol className="list-inside list-decimal text-base font-semibold opacity-90">
                <li>
                  Option 1: Send a WhatsApp Message
                  <ul>
                    <li className="whats-app">
                      - Open WhatsApp on your mobile device.
                    </li>
                    <li className="whats-app">
                      - Send a message to the following number: +1 415 523 8886.
                    </li>
                    <li className="whats-app">
                      - Include the code join shot-discuss in the message.
                    </li>
                  </ul>
                </li>
                <li className="mt-4">
                  Option 2: Scan the QR code
                  <ul>
                    <li className="whats-app">
                      - Open the camera or QR code scanner on your mobile
                      device.
                    </li>
                    <li className="whats-app">
                      - Scan the QR code displayed in the image.
                    </li>
                    <li className="whats-app">
                      - Follow the prompts to connect.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
            <div>
              <h2 className="my-4 text-2xl font-bold">
                Step 2: Connect to the Chatbot
              </h2>
              <ol className="list-inside list-decimal text-sm opacity-70">
                <li className="mb-4">
                  Once connected to the WhatsApp number, initiate a conversation
                  by sending the message:
                  <Card className="my-2 p-4">
                    <code>Chatbot ID: ${chatbotId}</code>
                  </Card>
                </li>
                <li>
                  You should receive a confirmation message:
                  <Card className="mb-4 mt-2 p-4">
                    Successfully connected to your Chatbot. You can now send
                    messages to your Chatbot.
                  </Card>
                </li>
              </ol>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold">
                Update or Change the Chatbot
              </h2>
              <ol className="list-inside list-decimal text-sm opacity-70">
                <li>
                  If you need to change the chatbot, simply send a message in
                  the following format:
                  <Card className="my-2 p-4">
                    <code>update chatbot: 15</code>
                  </Card>
                  (Replace 15 with the specific Chatbot ID you want to connect
                  to.)
                </li>
              </ol>
            </div>
          </div>
          <div className=" mt-5 flex justify-end">
            <Button className=" mr-4" onClick={() => downloadPDF()}>
              <CloudArrowDownIcon className="mr-1 h-4 w-4" /> Download as PDF
            </Button>
            <Button
              variant="outline"
              className=" w-40"
              onClick={() => {
                handleWhatsAppConnectModal();
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WhatsAppConnectModal;
